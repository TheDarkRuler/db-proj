import { TabView, TabPanel } from 'primereact/tabview';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { GetElements } from "../../common/Getter";
import background from '../../img/statisticsBack.jpg';
import "./NewsVis.css";
import { useLocation } from "react-router-dom";
import GoBackStats from '../commonStat/GoBackStats';

export default function ManageNews() {

    const renderListNews = () => {

        let node = 1;
        const newsTemp = GetElements('/news');
        let newsList = [];
        newsTemp.forEach(x => {
            newsList.push(JSON.parse(x));
        });

        const increment = (temp: number) => {
            node += 1;
            return temp;
        }

        return newsList.map((item) =>
            <TreeItem nodeId={`${increment(node)}`} label={`Articolo : ${item.argomento}`}>
                <TreeItem nodeId={`${increment(node)}`} label={`Scrittore: ${item.scrittore}`}>
                </TreeItem>
                <div className="textBox">{`${item.descrizione}`}</div>
            </TreeItem >
        );
    };

    return (
        <>
            <div className='background' style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: '100vh',
                width: '100vw',
            }}></div>
            <div className='tabellaNews'>
                <TabView>
                    <TabPanel className='tabNews' header="News">
                        <TreeView
                            aria-label="file system navigator"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            sx={{ height: 400, flexGrow: 1, width: 980, overflowY: 'auto' }}
                        >
                            {renderListNews()}
                        </TreeView>
                    </TabPanel>
                </TabView>
            </div>
            <>{GoBackStats(useLocation())}</>
        </>

    );
}