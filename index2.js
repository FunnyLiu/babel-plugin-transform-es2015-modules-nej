module.exports = function (babel) {
    const {
        types: t
    } = babel;

    const isExistExtraParams = false;

    return {
        visitor: {
            Program: function (path) {

                let names = [],
                    urls = [],
                    contents = [],
                    returnStatement;

                if (path.node.body.length <= 1) {
                    return;
                }

                path.node.body.forEach( itm => {
                    if (t.isImportDeclaration(itm)) {
                        importTransform(itm, names, urls)
                    } else if (t.isExport(itm)) {
                        exportTranform(itm, returnStatement, contents);
                    } else {
                        contents.push(itm);
                    }
                })

                names.push('p')

                let length = path.node.body.length;
                for (; 0 < path.node.body.length;) {
                    path.get('body.0').remove();
                }

                contents.push(returnStatement);

                let container = t.expressionStatement(
                    t.callExpression(
                        t.Identifier('define'), [
                            t.arrayExpression(urls),
                            t.functionExpression(null, names, t.blockStatement(contents))
                        ]
                    )

                )
                path.unshiftContainer('body', container);
            }
        }
    };
}

function addPrefix(url) {
    const [htmlExp, jsonExp] = [/(\.html)|(\.css)$/, /(\.json)$/];

    if (htmlExp.test(url)) {
        url = 'text!' + url;
    }
    if (jsonExp.test(url)) {
        url = 'json!' + url;
    }

    return url;
}

function importTransform(statement, names, urls) {
    // 获取import语句的name和url
    let [_name, _url] = [statement.specifiers[0].local.name, statement.source.value];

    // html，json，css类型增加前缀
    _url = addPrefix(_url);

    // url为nej时，标记注入额外参数
    if(_url == 'nej') {
        isExistExtraParams = true;
    }    
    
    names.push(t.identifier(_name));
    urls.push(t.stringLiteral(_url));
}

function isExport(statement) {
    return t.isExportNamedDeclaration(statement) || t.isExportNamedDeclaration(statement);
}

function exportTranform(statement, returnStatement, contents) {
    if(t.isExportDefaultDeclaration(statement)) {
        returnStatement = t.returnStatement(t.identifier(
            statement.declaration.name
        ));
    }

    if(t.isExportNamedDeclaration(statement)) {
        statement.specifiers.map( specifier => {
            return specifier.local.name;
        }).forEach( specifier => {
            contents.push();
        })

    }
}