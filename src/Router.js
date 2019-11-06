import React from 'react';
import PropTypes from 'prop-types';
import warning from 'tiny-warning';
import RouterContext from './RouterContext';
import './Router.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: props.history.location,
            locationStack: [props.history.location],
            animateType: props.animateType || 'translate',
            isTranslating: false
        };

        this._isMounted = false;
        this._pendingLocation = null;
        this._routeComponentMaps = {};

        if (!props.staticContext) {
            this.unlisten = props.history.listen((location, action) => {
                if (this._isMounted) {
                    this.setState({location});
                } else {
                    this._pendingLocation = location;
                }
                if (action === 'POP') {
                    this.state.locationStack.pop();
                    if (this.state.locationStack.length === 0) {
                        this.state.locationStack.push(location);
                    }
                } else if (action === 'PUSH') {
                    this.state.locationStack.push(location);
                } else if (action === 'REPLACE') {
                    this.state.locationStack.pop();
                    this.state.locationStack.push(location);
                }
                this.setState({
                    locationStack: this.state.locationStack
                });
            });
        }

        this.onEnter = this.onEnter.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExit = this.onExit.bind(this);
        this.onExited = this.onExited.bind(this);
        this.registComponent = this.registComponent.bind(this);
    }
    static computeRootMatch(pathname) {
        return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._pendingLocation) {
            this.setState({location: this._pendingLocation});
        }
    }

    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
        }
    }

    onEnter() {
        this.setState({
            isTranslating: true
        });
    }
    onEntered() {
        this.setState({
            isTranslating: false
        });
    }

    onExit() {
        this.setState({
            isTranslating: true
        });
    }

    onExited() {
        this.setState({
            isTranslating: false
        });
        const component = this._routeComponentMaps[this.state.locationStack.length - 1];
        if (component && component.componentResume) {
            component.componentResume();
        }
    }

    registComponent(index, component) {
        this._routeComponentMaps[index] = component;
    }
    render() {
        return (
            <div className="router-root">
                {this.state.isTranslating ? <div className="router-load-mask"></div> : null }
                <TransitionGroup>
                {
                    (this.state.locationStack || []).map((location, index) => (
                        <CSSTransition
                            key={index}
                            timeout={300}
                            classNames={this.state.animateType}
                            onEnter={this.onEnter}
                            onEntered={this.onEntered}
                            onExit={this.onExit}
                            onExited={this.onExited}
                        >
                        <RouterContext.Provider
                            children={this.props.children || null}
                            value={{
                                index: index,
                                history: this.props.history,
                                location: location,
                                match: Router.computeRootMatch(location.pathname),
                                staticContext: this.props.staticContext,
                                registComponent: this.registComponent
                            }} />
                        </CSSTransition>
                    ))
                }
                </TransitionGroup>
            </div>
        );
    }
}

if (__DEV__) {
    Router.protoTypes = {
        children: PropTypes.node,
        history: PropTypes.object.isRequired,
        staticContext: PropTypes.object,
        animateType: PropTypes.string
    };
    Router.prototype.componentDidUpdate = function(prevProps) {
        warning(
            prevProps.history === this.props.history,
            'You cannot change <Router history>'
        );
    };
}

export default Router;
