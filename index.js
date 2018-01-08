module.exports = function (babel) {
    const {
        types: t
    } = babel;

    var isImport, isExport,
        INJECT_PARAMS = [t.identifier("p"), t.identifier("o"), t.identifier("f"), t.identifier("r")],
        createReturn, createObj, createDefine,
        replace, importTransform, addPrefix;

    createReturn = function (returnValue) {
        return t.returnStatement(t.identifier(returnValue));
    }

    createObj = function (key, prop) {
        key = t.identifier(key);
        prop = t.identifier(prop);
        return t.expressionStatement(t.assignmentExpression('=',
            t.memberExpression(
                key,
                prop),
            prop
        ));
    }

    createDefine = function (urls, names, contents) {
        return t.expressionStatement(
            t.callExpression(
                t.Identifier('define'), [
                    t.arrayExpression(urls),
                    t.functionExpression(null, names, t.blockStatement(contents))
                ]
            )
        )
    }

    importTransform = function (statement) {
        let name, url;
        if (!statement.specifiers.length) {
            url = statement.source.value;
        }
        // 获取import语句的name和url
        else {
            [name, url] = [statement.specifiers[0].local.name, statement.source.value];
        }

        // html，json，css类型增加前缀
        url = addPrefix(url);

        // url为nej时，标记注入额外参数
        if (url == 'nej') {
            extraParams += statement.specifiers.length;
            name = '';
            url = '';
        } else {
            name = t.identifier(name);
            url = t.stringLiteral(url);
        }

        return {
            name,
            url
        }
    }

    isExport = function (statement) {
        return t.isExportDefaultDeclaration(statement) || t.isExportNamedDeclaration(statement);
    }

    addPrefix = function (url) {
        const [htmlExp, jsonExp] = [/(\.html)|(\.css)$/, /(\.json)$/];

        if (htmlExp.test(url)) {
            url = 'text!' + url;
        }
        if (jsonExp.test(url)) {
            url = 'json!' + url;
        }
        return url;
    }


    return {
        visitor: {
            Program: {
                enter: function enter(path) { // 如果是nej文件，不处理

                    if (!path.node.body[0]) { // 空文件
                        return;
                    }
                    //define
                    try {
                        if (path.node.body[0].expression.callee.name.toLocaleLowerCase() === 'define') {
                            this.stop = true;
                            return;
                        }
                    } catch (e) {}
                    // nej.define
                    try {
                        if (path.node.body[0].expression.callee.object.name.toLocaleLowerCase() === 'nej' && path.node.body[0].expression.callee.property.name === 'define') {
                            this.stop = true;
                            return;
                        }
                    } catch (e) {}
                },
                exit: function exit(path) { //从根目录开始遍历
                    if (this.stop) {
                        return;
                    }
                    const statements = path.node.body; // 获取全部语句  

                    let names = [],
                        urls = [],
                        contents = [],
                        returnStatement,
                        extraParams = 0,
                        isOutPutResult = false //是否存在输出结果集空间
                    ;

                    statements.forEach(statement => {
                        /**
                         * 如果是import
                         * import a from 'url' -> names.push(a);urls.push(url)
                         * import {a, b} from 'url' -> names.push(uniqueRandomName);urls.push(url); a = uniqueRandomName.a; b = uniqueRandomName.b;
                         * import {a, b, c} from 'nej' -> names.push(p, a, b, c); 最后才执行，执行后seal names
                         */
                        if (t.isImportDeclaration(statement)) {
                            let {
                                name,
                                url
                            } = importTransform(statement);
                            if (name.name) {
                                names.push(name);
                            }
                            if (url) {

                                urls.push(url);
                            }
                        }
                        /**
                         * 如果是export
                         * export default a; -> return a;
                         * export {a, b, c}; -> p.a = a; p.b = b; p.c = c;
                         */
                        else if (isExport(statement)) {
                            if (t.isExportDefaultDeclaration(statement)) {
                                returnStatement = createReturn(statement.declaration.name);
                            }

                            if (t.isExportNamedDeclaration(statement)) {
                                isOutPutResult = true;
                                statement.specifiers.forEach(specifier => {
                                    contents.push(createObj('p', specifier.local.name));
                                })
                            }
                        }
                        /**
                         * 如果都不是，不改变，直接放入contents，准备创建为define回调函数函数的函数体
                         */
                        else {
                            contents.push(statement);
                        }
                    });

                    if (isOutPutResult) {
                        names.push(INJECT_PARAMS[0]);
                    }

                    if (extraParams) {
                        names = names.concat(INJECT_PARAMS.slice(1, ++extraParams));
                    }

                    if (returnStatement) {
                        contents.push(returnStatement);
                    }

                    let newBody = createDefine(urls, names, contents);

                    /**
                     * 清空文件中的代码，创建define，放入body中
                     */
                    for (; 0 < statements.length;) {
                        path.get('body.0').remove();
                    }
                    path.unshiftContainer('body', newBody);
                }
            }
        }
    };
}