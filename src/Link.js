import React from 'react';
import RouterContext from './RouterContext';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import { resolveToLocation, normalizeToLocation } from './locationUtils';
const forwardRefShim = C => C;
let { forwardRef } = React;
if (typeof forwardRef === 'undefined') {
    forwardRef = forwardRefShim;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const LinkAnchor = forwardRef(({
    innerRef, navigate, onClick, ...rest
}, forwardedRef) => {
    const { target } = rest;

    let props = {
        ...rest,
        onClick: event => {
            try {
                if (onClick) onClick(event);
            } catch (ex) {
                event.preventDefault();
                throw ex;
            }

            if (
                !event.defaultPrevented &&
                event.button === 0 &&
                (!target || target === '_self') &&
                !isModifiedEvent(event)
            ) {
                event.preventDefault();
                navigate();
            }
        }
    };

    if (forwardRefShim !== forwardRef) {
        props.ref = forwardedRef || innerRef;
    } else {
        props.ref = innerRef;
    }

    return <a {...props} />
});

if (__DEV__) {
    LinkAnchor.displayName = 'LinkAnchor';
}

const Link = forwardRef(({
    component = LinkAnchor, replace, to, innerRef, ...rest
}, forwardedRef) => {
    return (
        <RouterContext.Consumer>
            {context => {
                invariant(context, 'You should not use <Link> outside a <Router>');

                const { history } = context;

                const location = normalizeToLocation(resolveToLocation(to, context.location), context.location);

                const href = location ? history.createHref(location) : '';

                const props = {
                    ...rest,
                    href,
                    navigate() {
                        const location = resolveToLocation(to, context.location);
                        const method = replace ? history.replace : history.push;

                        method(location);
                    }
                };
                if (forwardRefShim !== forwardedRef) {
                    props.ref = forwardedRef || innerRef;
                } else {
                    props.innerRef = innerRef;
                }

                return React.createElement(component, props);
            }}
        </RouterContext.Consumer>
    );
});

if (__DEV__) {
    const toType = PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]);
    const refType = PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.shape({current: PropTypes.any})]);

    Link.displayName = "Link";

    Link.propTypes = {
        innerRef: refType,
        onClick: PropTypes.func,
        replace: PropTypes.bool,
        target: PropTypes.string,
        to: toType.isRequired
    };
}

export default Link;
