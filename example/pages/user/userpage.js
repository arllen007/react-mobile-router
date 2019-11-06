import React from 'react';
import { hot } from 'react-hot-loader';
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

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }

    render() {
        return (
            <div style={style(this.props.index % 3)}>
                <button onClick={() => {
                    this.props.history.goBack();
                }}>返回</button>
                <h3>这是用户页面,还有什么需要处理的？</h3>
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

export default hot(module)(UserPage);


