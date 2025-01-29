import { useState, useImperativeHandle, forwardRef } from "react";

// для того чтобы мы могли использовать список значений из нескольких строк, мы
// должны иметь уникальный id у ParamValue.
// Или мы можем использовать добавить опциональное поле options
// и использовать select в компоненте ParamEditorForm если у Param есть options
export interface Param {
    id: number;
    name: string;
    type: "string";
    // options?: string[]
}

interface ParamValue {
    paramId: number;
    value: string;
}
// colors нигде не используется, поэтому я его закомментировал
interface Model {
    paramValues: ParamValue[];
    // colors: Color[];
}
interface Props {
    params: Param[];
    model: Model;
}

export interface ParamEditorHandle {
    getModel: () => Model;
}

export const ParamEditor = forwardRef<ParamEditorHandle, Props>(
    ({ params, model }, ref) => {
        const [paramValues, setParamValues] = useState<ParamValue[]>(
            model.paramValues
        );

        const handleValueChange = (paramId: number, value: string) => {
            setParamValues((prev) => {
                const existing = prev.find((pv) => pv.paramId === paramId);
                if (existing) {
                    return prev.map((pv) =>
                        pv.paramId === paramId ? { ...pv, value } : pv
                    );
                }
                return [...prev, { paramId, value }];
            });
        };

        useImperativeHandle(ref, () => ({
            getModel: () => ({
                paramValues,
            }),
        }));

        return (
            <div>
                {params.map((param) => {
                    const paramValue =
                        paramValues.find((pv) => pv.paramId === param.id)
                            ?.value || "";
                    return (
                        <ParamEditorForm
                            label={param.name}
                            value={paramValue}
                            handleValueChange={(value) =>
                                handleValueChange(param.id, value)
                            }
                        />
                    );
                })}
            </div>
        );
    }
);

interface ParamEditorFormProps {
    label: string;
    value: string;
    handleValueChange: (value: string) => void;
}

const ParamEditorForm = (props: ParamEditorFormProps) => {
    const { label, value, handleValueChange } = props;
    return (
        <div style={{ marginBottom: "1rem" }}>
            <label>{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => handleValueChange(e.target.value)}
            />
        </div>
    );
};
