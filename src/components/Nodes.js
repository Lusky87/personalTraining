export default function Nodes({$app, initialState, onClick, onBackClick}) {
    this.state = initialState;
    this.$target = document.createElement("ul");
    $app.appendChild(this.$target);
    //console.log(this.state.nodes)
    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.onClick = onClick;
    this.onBackClick = onBackClick;

    this.render = () => {
        //console.log("this.render실행")
        if (this.state.nodes) {
            const nodesTemplate = this.state.nodes.map(node => {
                //console.log(JSON.stringify(node))
                const iconPath = node.type === "FILE" ? "../src/assets/file.png":"../src/assets/directory.png";
                return `
                    <div class="Node ${this.state.style}" data-node-id="${node.id}">
                        <img class="${node.type === 'FILE'?'png':''}" src="${iconPath}" />
                        <div>${node.name}</div>
                    </div>
                `
            }).join("")

            this.$target.innerHTML = !this.state.isRoot ? `<div class="Node ${this.state.style}"><img src="../src/assets/prev.png"></div>${nodesTemplate}`:nodesTemplate
        }
    }

    //this.$target.querySelector(".Node").foreach($node => {
    this.$target.addEventListener("click", (e) => {
        const $node = e.target.closest('.Node')
        if ($node) {
            const {nodeId} = $node.dataset;
            console.log("nodeId  :  " + JSON.stringify(e.target))
            if (!nodeId) {
                this.onBackClick()
                return
            }

            const selectedNode = this.state.nodes.find(node => node.id == nodeId);

            if (selectedNode) {
                this.onClick(selectedNode);
            }
        }
    })


    this.render();
}