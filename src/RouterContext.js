import createContext from 'mini-create-react-context';

const createNamedContext = name => {
    const context = createContext();
    context.displayName = name;
    return context;
}

const context = createContext("Router");
export default context;
