
NEJ.define(['pool/component-base/src/base', 'pool/component-base/src/util', 'pool/component-list-view/src/list_view/component', 'pool/component-modal/src/modal/web/ui', 'pool/k12-cache-member/src/student-admin/cache', 'pool/edu-front-util/src/timeUtil', 'pool/component-notify/src/notify_mobile/ui', 'pool/cache-base/src/setting'], function (Component, util, ListView, Modal, stuCache, timeUtil, Notify, setting) {
    
    var manageListSetting = setting.get('module-operator-stu-manage-list');
    
    var OrgList = ListView.$extends({
        config: function () {
            util.extend(this, {
                listKey: 'um-operator-ux-stuList',
                listOpt: {}
            });
            util.extend(this.data, {
                previewPrefix: manageListSetting['previewPrefix'] || 'http://teach.100.163.com'
            });
            this.stuCacheIns = stuCache.Student._$allocate({});
            this.supr();
            // TODO
        }
    });

    OrgList.filter('formatTime', function (value) {
        return timeUtil._$formatTime(value, 'yyyy.MM.dd');
    });

    return OrgList;
});
