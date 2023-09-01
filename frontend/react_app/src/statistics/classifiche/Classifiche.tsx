import React from 'react';
import "./Classifiche.css";
import background from '../../img/statisticsBack.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import { GetElements } from '../../common/Getter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeItem, TreeView } from '@mui/lab';
import GoBackStats from '../commonStat/GoBackStats';

export default function Statistics() {

    const ShowClassifiche = () => {

        const pesoPiumaTemp = GetElements('/pesoPiuma');
        const welterWeightTemp = GetElements('/welterWeight');
        const pesoMedioTemp = GetElements('/pesoMedio');
        const pesiMassimiTemp = GetElements('/pesiMassimi');

        let pesoPiumaList = [];
        let welterWeightList = [];
        let pesoMedioList = [];
        let pesiMassimiList = [];

        pesoPiumaTemp.forEach(x => {
            pesoPiumaList.push(JSON.parse(x));
        });

        welterWeightTemp.forEach(x => {
            welterWeightList.push(JSON.parse(x));
        });

        pesoMedioTemp.forEach(x => {
            pesoMedioList.push(JSON.parse(x));
        });

        pesiMassimiTemp.forEach(x => {
            pesiMassimiList.push(JSON.parse(x));
        });

        const renderListClassifica = (tempList: any[]) => {

            tempList = tempList.sort((n1, n2) => n2.punteggio - n1.punteggio);

            let node = 1;
            let position = 1;

            const increment = (temp: number) => {
                node += 1;
                return temp;
            }
            const incrementPosition = (temp: number) => {
                position += 1;
                return temp;
            }

            return tempList.map((item) =>
                <TreeItem nodeId={`${increment(node)}`} label={`${incrementPosition(position)}# : ${item.cf}`}>
                    <TreeItem nodeId={`${increment(node)}`} label={`Nome: ${item.nome}`}></TreeItem>
                    <TreeItem nodeId={`${increment(node)}`} label={`Cognome: ${item.cognome}`}></TreeItem>
                    <TreeItem nodeId={`${increment(node)}`} label={`Peso: ${item.peso}`}></TreeItem>
                    <TreeItem nodeId={`${increment(node)}`} label={`Disciplina: ${item.arteMarziale}`}></TreeItem>
                    <TreeItem nodeId={`${increment(node)}`} label="Record ↴">
                        <TreeItem nodeId={`${increment(node)}`} label={`Vittorie: ${item.vittorie}`}></TreeItem>
                        <TreeItem nodeId={`${increment(node)}`} label={`Sconfitte: ${item.sconfitte}`}></TreeItem>
                        <TreeItem nodeId={`${increment(node)}`} label={`Pareggi: ${item.pareggi}`}></TreeItem>
                    </TreeItem>
                </TreeItem >
            );
        };

        return (
            <div className='tabellaClassifica'>
                <TabView>
                    <TabPanel className='tab' header="PesoPiuma">
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            sx={{ height: 300, flexGrow: 1, width: 1000, overflowY: 'auto' }}
                        >
                            {renderListClassifica(pesoPiumaList)}
                        </TreeView>
                    </TabPanel>
                    <TabPanel className='tab' header="WelterWeight">
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            sx={{ height: 300, flexGrow: 1, width: 1000, overflowY: 'auto' }}
                        >
                            {renderListClassifica(welterWeightList)}
                        </TreeView>
                    </TabPanel>
                    <TabPanel className='tab' header="PesoMedio">
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            sx={{ height: 300, flexGrow: 1, width: 1000, overflowY: 'auto' }}
                        >
                            {renderListClassifica(pesoMedioList)}
                        </TreeView>
                    </TabPanel>
                    <TabPanel className='tab' header="PesiMassimi">
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            sx={{ height: 300, flexGrow: 1, width: 1000, overflowY: 'auto' }}
                        >
                            {renderListClassifica(pesiMassimiList)}
                        </TreeView>
                    </TabPanel>
                </TabView>
            </div>
        );
    }

    return (
        <div className='Statistics'>
            <div className='background' style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
            }}>
                <p className='classificheText'>
                    Classifiche ↴
                </p>
                <ShowClassifiche />
                <>{GoBackStats(useLocation())}</>
            </div>
        </div>
    );
}