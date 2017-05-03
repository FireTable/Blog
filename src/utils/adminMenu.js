module.exports = [
  {
    key: 'dashboard',
    name: '仪表盘',
    icon: 'laptop',
  },
  {
    key: 'messageManage',
    name: '文章留言管理',
    icon: 'user',
  },
  {
    key: 'blogManage',
    name: '博客管理',
    icon: 'api',
  },{
    key: 'blogrollManage',
    name: '友链审核',
    icon: 'setting',
  },{
    key: 'systemManage',
    name: '系统管理',
    icon: 'camera-o',
    child: [
      {
        key: 'indexPageM',
        name: '首页管理',
      },
      {
        key: 'changeUser',
        name: '账户信息更改',
      }
    ],
  },
]
