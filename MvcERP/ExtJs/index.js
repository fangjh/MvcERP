Ext.require(['*']);

Ext.onReady(function () {

    Ext.QuickTips.init();

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var treenode = [
        {
            text: '账单', expanded: true, children: [
               { text: '账单管理', id: 'bill_grid', leaf: true },
               { text: '账单类别', id: 'bill_type_grid', leaf: true },
               { text: '结算历史', id: 'settlement_history_grid', leaf: true }
            ]
        },
        { text: '用户', id: 'user_grid', leaf: true }
    ];

    var navpanel = Ext.create('Ext.tree.Panel', {
        collapsible: true,
        margins: '0 0 2 2',
        //cmargins: '0 2 5 5',
        title: '导航',
        animate: true,
        autoScroll: true,
        rootVisible: false,
        root: { id: "root", text: "导航", expanded: true, children: treenode },

        listeners: {
            'click': function (node, e) {
                if (!node.isLeaf())
                    return;
                opentab(node.id, node.text, { xtype: node.id });
            }
        }
    });

    var tabpanel = Ext.create('Ext.tab.Panel', {
        activeTab: 0,
        margins: '0 2 2 0',
        autoScroll: true,
        deferredRender: false,
        defaults: { autoHeight: true },
        items: [
            { title: '首页' }
        ]
    });

    var viewport = Ext.create('Ext.Viewport', {
        id: 'border-example',
        layout: 'border',
        items: [
            // create instance immediately
            Ext.create('Ext.Component', {
                region: 'north',
                height: 32, // give north and south regions a height
                autoEl: {
                    tag: 'div',
                    html: '<p>north - generally for menus, toolbars and/or advertisements</p>'
                }
            }),

            Ext.apply(navpanel, { region: 'west', width: 200, split: true, minWidth: 175 }),

            Ext.apply(tabpanel, { region: 'center' })
        ]
    });
});