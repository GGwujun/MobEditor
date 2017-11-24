
# mobeditor

## 介绍

**mobeditor** —— 轻量级移动端富文本编辑器，配置方便，使用简单。支持 IE10+ 浏览器。




## 下载

- 直接下载：[https://github.com/wangfupeng1988/wangEditor/releases](https://github.com/wangfupeng1988/wangEditor/releases)
- 使用`npm`下载：`npm install mobeditor` （注意 `mobeditor` 全部是**小写字母**）
- 使用`bower`下载：`bower install mobeditor` （前提保证电脑已安装了`bower`）

## 使用

```javascript
var contentEditor = new mobeditor({
        el: '#contentEditor',
        placeHolder: 'placeHolder设置占位符',
        upload: {
            server: '/upload.json',
            compress: false,
            fileSizeLimit: 2
        },
        toolbars: [
            'insertText',
            'editText',
            'insertImage',
            'insertLink',
            'deleteBefore',
            'deleteAfter',
            'insertHr',
            'deleteThis',
            'cancel'
        ]
    });
```


## 运行 demo

- 下载源码 `git clone https://github.com/GGwujun/MobEditor.git`
- 安装或者升级最新版本 node（最低`v6.x.x`）
- 进入目录，安装依赖包 `cd MobEditor && npm i`

## 交流

### QQ 群

以下 QQ 群欢迎加入交流问题

- 225192209

### 提问


- 直接在 [github issues](https://github.com/GGwujun/MobEditor/issues) 提交问题



### 更新日志

#### v1.0.1 （2017.11.24）

- [done] 发布 v1.0.1