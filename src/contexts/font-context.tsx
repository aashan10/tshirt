import React, {useContext, useState} from "react";
import Head from "next/head";

interface FontState {
    addFont: (font: string) => void
    fonts: Array<string>
}

const FontContext = React.createContext<FontState>({
    addFont: (font: string) => {},
    fonts: []
});

const FontProvider = ({children} : {children: React.ReactElement}) => {
    const [fonts, setFonts] = useState<Array<string>>([]);
    
    return (
        <FontContext.Provider value={{
            addFont: (font: string) => {
                const newFonts = new Set([...fonts, font]);
                setFonts(Array.from(newFonts.values()));
            },
            fonts: fonts,
        }}>
            <Head>
                {fonts.map((font, index) => {
                    return (
                        <link rel="stylesheet" key={index} href={`https://fonts.googleapis.com/css2?family=${font.replaceAll(' ', '+').replaceAll('-', '+')}`} />
                    )
                })}
            </Head>
            {children}
        </FontContext.Provider>
    )
}

const useFonts = () : FontState => {
    return useContext(FontContext);
}

export default FontContext;
export {FontProvider, useFonts}
export type {FontState};
