import GoBack from "../../common/GoBack";
import { TabView, TabPanel } from 'primereact/tabview';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { GetElements, client } from "../../common/Getter";
import background from '../../img/lottatoreBackg.jpg';
import "./ManageNews.css";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useLocation } from "react-router-dom";

export default function ManageNews() {

    const username = useLocation().state.username;

    const toast = useRef<Toast>(null);
    const buttonEl = useRef(null);

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

        const reject = () => {
            toast.current?.show({ severity: 'warn', summary: 'Rifiutato', detail: 'Hai Rifiutato', life: 3000 });
        };

        const confirm = (id: number) => {
            confirmPopup({
                target: buttonEl.current,
                message: 'Sicuro di voler eliminare questo Record?',
                icon: 'pi pi-info-circle',
                acceptClassName: 'p-button-danger',
                accept() {
                    client.get(`/news/rimuovi/:${id}`);
                    setInterval(() => window.location.reload(), 1000);
                },
                reject
            });
        };


        return newsList.map((item) =>
            <TreeItem nodeId={`${increment(node)}`} label={`Articolo : ${item.argomento}`}>
                <TreeItem nodeId={`${increment(node)}`} label={`Scrittore: ${item.scrittore}`}>
                </TreeItem>
                <div className="textBox">{`${item.descrizione}`}</div>
                <button ref={buttonEl} onClick={() => confirm(item.idNews)} className="buttonRemoveNews">rimuovi</button>
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
            <Toast ref={toast} />
            <ConfirmPopup />
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
            <>{GoBack(username)}</>
        </>

    );
}