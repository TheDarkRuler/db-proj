import './Scontri.css';
import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { ScheletroScontri } from './ScheletroScontri';

export default function AddScontri() {

    function InitialScontro() {

        const ScontroI = ScheletroScontri;
        const ScontroII = ScheletroScontri;
        const ScontroIII = ScheletroScontri;
        const ScontroIV = ScheletroScontri;
        const ScontroV = ScheletroScontri;

        const [ScontroIII_Vis, setScontroIIIVis] = useState(true);
        const [ScontroIV_Vis, setScontroIV_Vis] = useState(true);
        const [ScontroV_Vis, setScontroV_Vis] = useState(true);

        const addVisibility = () => {
            ScontroIII_Vis? setScontroIIIVis(false) : 
            ScontroIV_Vis? setScontroIV_Vis(false) : 
            ScontroV_Vis? setScontroV_Vis(false) : setScontroV_Vis(false);
        }

        const removeVisibility = () => {
            ScontroV_Vis? ScontroIV_Vis? ScontroIII_Vis? 
            setScontroIIIVis(true) : setScontroIIIVis(true) : setScontroIV_Vis(true) : setScontroV_Vis(true);
        }

        return (
            <>
                <div className='btn-group'>
                    <button disabled={!ScontroIII_Vis && !ScontroIV_Vis && !ScontroV_Vis} 
                        className='buttonScontri' onClick={addVisibility}>
                        +
                    </button>
                    <button disabled={ScontroIII_Vis && ScontroIV_Vis && ScontroV_Vis} 
                        className='buttonScontri' onClick={removeVisibility}>
                        -
                    </button>
                </div>
                <div className="listScontri">
                    <Accordion >
                        <AccordionTab header={
                            <div className="flex align-items-center">
                                <span className="vertical-align-middle">Scontro I</span>
                            </div>
                        }>
                            <>{ScontroI(1)}</>
                        </AccordionTab>
                        <AccordionTab header={
                            <div className="flex align-items-center">
                                <span className="vertical-align-middle">Scontro II</span>
                            </div>
                        }>
                            <>{ScontroII(2)}</>
                        </AccordionTab>
                        <AccordionTab disabled={ScontroIII_Vis} header={
                            <div className="flex align-items-center">
                                <span className="vertical-align-middle">Scontro III</span>
                            </div>
                        }>
                            <>{ScontroIII(3)}</>
                        </AccordionTab>
                        <AccordionTab disabled={ScontroIV_Vis} header={
                            <div className="flex align-items-center">
                                <span className="vertical-align-middle">Scontro IV</span>
                            </div>
                        }>
                            <>{ScontroIV(4)}</>
                        </AccordionTab>
                        <AccordionTab disabled={ScontroV_Vis} header={
                            <div className="flex align-items-center">
                                <span className="vertical-align-middle">Scontro V</span>
                            </div>
                        }>
                            <>{ScontroV(5)}</>
                        </AccordionTab>
                    </Accordion>
                </div>
            </>
        );
    }

    return (
        <div className='Scontri'>
            <InitialScontro />
        </div>
    );
    
};
