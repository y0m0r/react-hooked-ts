import React from 'react';

interface IHeader {
    text: string
}

const Header: React.VFC<IHeader> = (props: IHeader) => {
    return (
        <>
            <header className="App-header">
                <h2>{props.text}</h2>
            </header>
        </>
    )
}

export default Header;