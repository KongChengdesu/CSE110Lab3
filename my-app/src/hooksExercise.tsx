import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./ThemeContext";

function ClickCounter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);

    const theme = useContext(ThemeContext);
    return (
        <div
            style={{
                background: theme.background,
                color: theme.foreground,
                padding: "20px",
            }}
        >
            <p>You clicked {count} times </p>
            <button
                onClick={() => setCount(count + 1)}
                style={{ background: theme.foreground, color: theme.background }}
            >
                Click me
            </button>
        </div>
    );


}

function ToggleTheme(toggleTheme: any, currentTheme: any) {

    const onToggle = () => {
        toggleTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };

    useEffect(() => {
        document.body.style.backgroundColor = currentTheme.background;
        document.body.style.color = currentTheme.foreground;
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={currentTheme}>
            <button onClick={onToggle}> Toggle Theme </button>
        </ThemeContext.Provider>
    );
}

export default ToggleTheme;
//export default ClickCounter;



