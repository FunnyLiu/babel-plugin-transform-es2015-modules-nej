/*
 * 页面入口模块实现文件
 *
 * Auto build by NEI Builder
 */

import k from 'base/klass';
import m from 'pro/common/page';
import html from  './module.htm';
import _adminVideoConfig from 'pro/common/config/adminVideoConfig'; // 统一的视频配置，其他文件不需要再依赖了
import _adminUploadConfig from 'pro/common/config/adminUploadConfig'; // 统一的上传配置，其他文件不需要再依赖了
import _setting from 'pool/cache-base/src/setting';
import _configAdmin from 'config/admin'; // 统一导入admin工程业务线配置(2c/k12)
// import {p,pro} from 'nej';

/**
 * 页面模块实现类
 *
 * @class   _$$IndexPage
 * @extends pro/common/module._$$IndexPage
 * @param  {Object} options - 模块输入参数
 */
p._$$IndexPage = k._$klass();
pro = p._$$IndexPage._$extend(m);

/**
 * 模块初始化
 * @private
 * @param  {Object} options - 输入参数信息
 * @return {Void}
 */
pro.__init = function (options) {
    this.__super(options);
    _setting.batch(_configAdmin);
};

/**
 * 模块重置逻辑
 * @private
 * @param  {Object} options - 输入参数信息
 * @return {Void}
 */
pro.__reset = function (options) {
    this.__super(options);
};
/**
 * 模块销毁逻辑
 * @private
 * @return {Void}
 */
pro.__destroy = function () {
    this.__super();
};

