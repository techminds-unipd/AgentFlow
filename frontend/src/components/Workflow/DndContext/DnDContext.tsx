import { createContext, useContext, useState } from "react";

const DnDContext = createContext([null, () => {}]);

export const DnDProvider = ({ children }: any) => {
    const [serviceDnD, setServiceDnD] = useState<any>();

    return <DnDContext.Provider value={[serviceDnD, setServiceDnD]}>{children}</DnDContext.Provider>;
};

export default DnDContext;

export const useDnD = () => {
    return useContext(DnDContext);
};
