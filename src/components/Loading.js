const LOADING_IMG_PATH = '../src/assets/nyan-cat.gif';
export default function Loading ( {$app, initialState }) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = "Loading Modal"
    console.log(this.state)
    $app.appendChild(this.$target)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `<div class="content"> <img src="${LOADING_IMG_PATH}" /></div>`

        this.$target.style.display = this.state.isLoading ? 'block' : 'none'
    }

    this.render()
}