# react-mobile-router
- React移动端WEB路由
- 修改react-router 部分代码，历史路由页面不销毁，回退时不刷新页面
- 支持页面载入和退出动画效果

## 📦 安装

```bash
npm install react-mobile-router --save
```

```bash
yarn add react-mobile-router
```

## 🔨 示例
![image](https://github.com/arllen007/DesImages/blob/master/react-mobile-router.gif)

## 示例代码
```jsx harmony
    import React from 'react';
    import { BrowserRouter, Route } from 'react-mobile-router';
    import { UserPage } from './pages/user/userpage';
    
    export class App extends React.Component {
        render() {
            return (
                <BrowserRouter>
                    <Route path={'/'} component={UserPage}></Route>
                </BrowserRouter>
            );
        }
    }
```

## 钩子
|  Name           | Description             |
|  -------------  | ----------------------- |
| componentResume | 重新回退到当前路由时触发  |
```js
    componentResume() {
            //Todo
    }
```
    
