import { useState } from "react"
import './StylingExample.css'

export function StylingExample() {

    const styles = {
        backgroundColor: "#202020",
        minHeight: "100vh",
        display: "flex"
    }


    return (
        <div style={styles}>
            <div style={{ backgroundColor: "red" }} className="card-1">
             
            </div>
            <div style={{ backgroundColor: "blue" }} className="card-2">

            </div>
            <div style={{ backgroundColor: "yellow" }} className="card-3">

            </div>
        </div>
    )
}