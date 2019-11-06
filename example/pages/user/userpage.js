import React from 'react';
import Link from '../../../src/Link';

const style = (index) => {
  return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      backgroundColor: ['red', 'white', 'yellow'][index]
  }
};

export class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
        this.name = ['张三', '李四', '王五', '赵七', '钱九', '孙狗'][this.props.index % 6];
    }

    componentResume() {
        console.log(`我${this.name}又回来了！！！`);
    }

    render() {
        return (
            <div style={style(this.props.index % 3)}>
                <button onClick={() => {
                    this.props.history.goBack();
                }}>返回</button>
                <h3>这是用户{this.name}的页面！！</h3>
                <br />
                <button onClick={() => {
                    this.state.userList.push(`用户${this.state.userList.length + 1}`);
                    this.setState({
                        userList: this.state.userList
                    });
                }}>添加用户</button>
                <ul>
                    {
                        this.state.userList.map((val, index) => <li key={index}><Link to={''}>{val}</Link></li>)
                    }
                </ul>
            </div>
        );
    }
}


