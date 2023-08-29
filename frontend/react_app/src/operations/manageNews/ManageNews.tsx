import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import GoBack from "../../common/GoBack";

export default function ManageNews() {

    const fromPath = useLocation().state.fromPath;

    return (
        <div>
            <>{GoBack(fromPath)}</>
        </div>
    );
}