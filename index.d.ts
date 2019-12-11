import * as React from 'react';
import * as H from 'history';

export interface RouterProps {
    history: H;
    animateType?: string;
}

export class Router extends React.Component<RouterProps>{

}


export interface RouteProps {
    component: React.Component,
    path: string,
}

export class Route extends React.Component<RouteProps>{
}


export class BrowserRouter extends React.Component{}

export class HashRouter extends React.Component{}

export interface LinkProps {
    innerRef?: string | Function | {current?: any};
    onClick?: Function;
    replace?: boolean;
    target?: string;
    to: string | Object | Function;
}

export class Link extends React.Component<LinkProps>{}




