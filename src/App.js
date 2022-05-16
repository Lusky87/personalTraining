import Menu from "./components/Menu.js"
import ImageView from "./components/ImageView.js"
import Breadcrumb from "./components/Breadcrumb.js"
import VocaApp from "./components/VocaApp.js"
import Nodes from "./components/Nodes.js"
import { request } from "./api/api.js"
import Loading from "./components/Loading.js"

export default function App ($app) {
    this.state = {
        menus: [{name:"고양이 사진첩",id:1},{name:"단어장",id:2}],
        isRoot : false,
        nodes: [],
        depth: [],
        isLoading : true,
        selectedFilePath: null,
        selectedMenu: "",
        style : ""
    }

    const menu = new Menu({
        $app,
        initialState: this.state,
        onClick: (index) => {
            console.log("APP 내부 onclick", index)
            this.setState({
                ...this.state,
                selectedMenu: index 
            })
            // const nextState = {...this.state}
            // const nextDept = this.state.depth.slice(0, index + 1)
 
            // this.setState({
            //     ...nextState,
            //     dept: ndexDepth,
            //     nodes: cache[nextDepth[nextDept.length - 1].id]
            // })
        }
    })

    const breadcrumb = new Breadcrumb({
        $app,
        initialState: this.state.depth,
        onClick: (index) => {
            if (index === null) {
                this.setState({
                    ...this.state,
                    depth: [],
                    nodes: cache.root
                })
                return
            }

            if (index === this.state.depth.length -1) {
                return
            }

            const nextState = {...this.state}
            const nextDept = this.state.depth.slice(0, index + 1)

            this.setState({
                ...nextState,
                dept: ndexDepth,
                nodes: cache[nextDepth[nextDept.length - 1].id]
            })
        }
    })
    const vocaApp = new VocaApp({
        $app,
        initialState: 'voca',
        onClick: (index) => {
            if (index === null) {
                this.setState({
                    ...this.state,
                    depth: [],
                    nodes: cache.root
                })
                return
            }

            const nextState = {...this.state}
            this.setState({
                ...nextState
            })
        }
    })


    this.setState = (nextState) => {
        this.state = nextState;
        menu.setState(this.state)
        vocaApp.setState(this.state)
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
        console.log("nextState  ///  " + JSON.stringify(nextState))
    }

    const init = async() => {
        try {
            this.setState({
                ...this.state,
            });
        } catch (e) {
            console.log('error : ' + e);
        } finally {
            this.setState({
                ...this.state,
            })
        }
    }

    init();
}