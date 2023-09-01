import './ScontriVis.css';
import React, { useState } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { ScheletroScontriVis } from './ScheletroScontriVis';

export default function ScontriVis(scontriXEvento: any) {

    const InitialScontroVis = () => {

        const ScontroI = ScheletroScontriVis;
        const ScontroII = ScheletroScontriVis;
        const ScontroIII = ScheletroScontriVis;
        const ScontroIV = ScheletroScontriVis;
        const ScontroV = ScheletroScontriVis;
        console.log(scontriXEvento);

        return (
            <div className="listScontriVis">
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
                    <AccordionTab header={
                        <div className="flex align-items-center">
                            <span className="vertical-align-middle">Scontro III</span>
                        </div>
                    }>
                        <>{ScontroIII(3)}</>
                    </AccordionTab>
                    <AccordionTab  header={
                        <div className="flex align-items-center">
                            <span className="vertical-align-middle">Scontro IV</span>
                        </div>
                    }>
                        <>{ScontroIV(4)}</>
                    </AccordionTab>
                    <AccordionTab header={
                        <div className="flex align-items-center">
                            <span className="vertical-align-middle">Scontro V</span>
                        </div>
                    }>
                        <>{ScontroV(5)}</>
                    </AccordionTab>
                </Accordion>
            </div>
        );
    }

    return (
        <div className='ScontriVis'>
            <InitialScontroVis/>
        </div>
    );

};
