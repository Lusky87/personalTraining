import ImageView from "./components/ImageView.js"
import Breadcrumb from "./components/Breadcrumb.js"
import Nodes from "./components/Nodes.js"
import { request } from "./api/api.js"
import Loading from "./components/Loading.js"

export default function CatApp ($app) {
    this.state = {
        isRoot : false,
        nodes: [],
        depth: [],
        isLoading : true,
        selectedFilePath: null
    }

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

    const nodes = new Nodes({
        $app,
        initialState: {
            ...this.state,
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        onClick: async (node) => {
            try {
               if (node.type === "DIRECTORY") {
                console.log("폴더   ::   " + node.id);
                const nextNodes = await request(node.id)
                this.setState({
                    ...this.state,
                    depth: [...this.state.depth, node],
                    nodes: nextNodes
                })
               } else if (node.type === "FILE") {
                console.log("파일  // " +node.filePath);
                    this.setState({
                        ...this.state,
                        selectedFilePath: node.filePath
                    })
                    console.log("selectedFilePath : " + node.filePath)
               }
            } catch (e) {

            }
        },
        onBackClick: async () => {
            try {
                const nextState = {...this.state}
                nextState.depth.pop()

                const prevNodeId = nextState.depth.length === 0 ? null : nextState.depth[nextState]

                if (prevNodeId === null) {
                    const rootNodes = await request()
                    this.setState({
                        ...nextState,
                        isRoot: true,
                        nodes: rootNodes
                    })
                } else {
                    const prevNodes = await request(prevNodeId)

                    this.setState({
                        ...nextState,
                        isRoot: false,
                        nodes: prevNodes,
                    })
                }

            } catch (error) {
                
            }
        },
    })

    const imageView = new ImageView({
        $app,
        initialState: this.state.selectedNodeImage
    })

    const loading = new Loading({$app,
        initialState: {
            ...this.state,
            isLoading:this.state.isLoading
        }
    })

    this.setState = (nextState) => {
        this.state = nextState;
        vocaApp.setState(this.state)
        breadcrumb.setState(this.state.depth);
        nodes.setState({
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        })
        console.log("nextState  ///  " + JSON.stringify(nextState))
        imageView.setState(this.state.selectedFilePath)
        loading.setState(this.state.isLoading)
    }

    const init = async() => {
        try {
            this.setState({
                ...this.state,
                isLoading: true
            })
            const rootNodes = await request()
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            });
        } catch (e) {
            console.log('error : ' + e);
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            })
        }
    }

    init();
}