import { createContext, useState } from "react";

const TokenContext = createContext({
        Token: null,
});

export const TokenContextProvider=(props)=>{
    const tokenContext = {
        Token: null,
        gid:null,
        name:null,
        email:null,
        semid:null,
        section:null,
        profileurl:null,
    };

    return(
        <TokenContext.Provider value={tokenContext}>{props.children}</TokenContext.Provider>
    )
}

export default TokenContext