export default function VocaApp({$app, initialState = [], onClick}) {
    this.state = initialState;
    this.$target = document.createElement("div");
    this.$target.className = "VocaApp";
    $app.appendChild(this.$target);
    console.log("VocaApp")
    this.onClick = onClick

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    }

    this.render = () => {
        
        this.$target.innerHTML = `
            <div className="v-area ${this.state.style}" style="width:200px;height:200px;backgroud-color:red;">
            단어장영역
            </div>
        `
    }

    this.$target.addEventListener('click', (e) => {
        const $navItem = e.target.closest('.nav-item')

        if ($navItem) {
            const { index } = $navItem.dataset
            this.onClick(index ? parseInt(index, 10) : null)
        }
    })

    this.render()
}