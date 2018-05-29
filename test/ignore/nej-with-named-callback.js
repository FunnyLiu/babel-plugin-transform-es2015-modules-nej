/*
     * ------------------------------------------
     * 富媒体编辑器toolbar实现文件
     * @version  1.0
     * @author   hzwujiazhen(hzwujiazhen@corp.netease.com)
     * ------------------------------------------
     */
    var f = function (s, key, baseBar, autoScrollBar, autoShowBar) {

        var _ = NEJ.P,
            _e = _('nej.e'),
            _u = _('nej.u'),
            _t = _('nej.ut'),
            _v = _('nej.v'),
            _p = _('nej.ui'),
            _proEduEditorToolbar,
            _supEduEditorToolbar;

        /**
         * 富媒体编辑器基类封装
         * @class   {nej.ui._$$EduEditorToolbar2} 富媒体编辑器基类封装
         * @extends {nej.ui._$$Abstract}
         * @param   {Object} 可选配置参数，已处理参数列表如下
         * 
         */
        _p._$$EduEditorToolbar2 = NEJ.C();
        _proEduEditorToolbar = _p._$$EduEditorToolbar2._$extend(_p._$$Abstract);

        /**
         * 控件初始化
         * @protected
         * @method {__init}
         * @return {Void}
         */
        _proEduEditorToolbar.__init = function () {
            this.__supInit();
        };

        /**
         * 控件重置
         * @protected
         * @method {__reset}
         * @param  {Object} 可选配置参数
         * @return {Void}
         */
        _proEduEditorToolbar.__reset = function (_options) {
            this.__supReset(_options);

            if (s.get(key)['TOOLBAR_AUTO_FIX_TOP']) {
                this.__autoScrollToolBar = autoScrollBar._$allocate(_options);
            } else if (s.get(key)['TOOLBAR_AUTO_SHOW_HIDE']) {
                this.__autoShowToolBar = autoShowBar._$allocate(_options);
            } else {
                this.__baseBar = baseBar._$allocate(_options);
            }
        };

        /**
         * 控件销毁
         * @protected
         * @method {__destroy}
         * @return {Void}
         */
        _proEduEditorToolbar.__destroy = function () {
            this.__supDestroy();

            if (this.__autoScrollToolBar) {
                this.__autoScrollToolBar = autoScrollBar._$recycle(this.__autoScrollToolBar);
            }

            if (this.__autoShowToolBar) {
                this.__autoShowToolBar = autoShowBar._$recycle(this.__autoShowToolBar);
            }

            if (this.__baseBar) {
                this.__baseBar = baseBar._$recycle(this.__baseBar);
            }
        };

        return _p._$$EduEditorToolbar2;
    };

    NEJ.define(['pool/cache-base/src/setting', '../../../key.js', './baseBar.js', './autoScrollBar.js', './focusShowBar.js'], f);