import { useRef } from "react";
import "./App.css";
import {
    Param,
    ParamEditor,
    ParamEditorHandle,
} from "./components/ParamEditor";

const initialModel = {
    paramValues: [
        {
            paramId: 1,
            value: "повседневное",
        },
        {
            paramId: 2,
            value: "макси",
        },
    ],
};

const initialParams: Param[] = [
    {
        id: 1,
        name: "Назначение",
        type: "string",
    },
    {
        id: 2,
        name: "Длина",
        type: "string",
    },
];

function App() {
    const paramEditorRef = useRef<ParamEditorHandle>({
        getModel: () => initialModel,
    });

    const getModel = () => paramEditorRef.current?.getModel();

    return (
        <>
            <ParamEditor
                params={initialParams}
                model={initialModel}
                ref={paramEditorRef}
            />
            <button onClick={() => console.log(getModel())}>Get Model</button>
        </>
    );
}

export default App;
