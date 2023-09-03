import './ScontriVis.css';
import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { ScheletroScontriVis } from './ScheletroScontriVis';

export default function ScontriVis(scontriXEvento: any, lenght: number) {

    const InitialScontroVis = () => {

        const ScontroI = ScheletroScontriVis;
        const ScontroII = ScheletroScontriVis;
        const ScontroIII = ScheletroScontriVis;
        const ScontroIV = ScheletroScontriVis;
        const ScontroV = ScheletroScontriVis;

        return (
            <div className="listScontriVis">
                <Accordion >
                    <AccordionTab header={
                        <div className="flex align-items-center">
                            <span className="vertical-align-middle">Scontro I</span>
                        </div>
                    }>
                        <>{scontriXEvento !== undefined? ScontroI(1, scontriXEvento[0]): ""}</>
                    </AccordionTab>
                    <AccordionTab header={
                        <div className="flex align-items-center">
                            <span className="vertical-align-middle">Scontro II</span>
                        </div>
                    }>
                        <>{scontriXEvento !== undefined? ScontroII(2, scontriXEvento[1]): null}</>
                    </AccordionTab>
                    <AccordionTab disabled={lenght < 3} header={
                        <div className="flex align-items-center">
                            <span className="vertical-align-middle">Scontro III</span>
                        </div>
                    }>
                        <>{(scontriXEvento === undefined || lenght < 3)? "": ScontroIII(3, scontriXEvento[2])}</>
                    </AccordionTab>
                    <AccordionTab disabled={lenght < 4}  header={
                        <div className="flex align-items-center">
                            <span className="vertical-align-middle">Scontro IV</span>
                        </div>
                    }>
                        <>{(scontriXEvento === undefined || lenght < 4)? "": ScontroIV(4, scontriXEvento[3])}</>
                    </AccordionTab>
                    <AccordionTab disabled={lenght < 5} header={
                        <div className="flex align-items-center">
                            <span className="vertical-align-middle">Scontro V</span>
                        </div>
                    }>
                        <>{(scontriXEvento === undefined || lenght < 5)? "": ScontroV(5, scontriXEvento[4])}</>
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
