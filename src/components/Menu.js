export default function Menu({ $app, initialState, onClick}) {
    this.state = initialState
    this.$target = document.createElement('div')
    this.$target.className = 'Menu'
    //console.log("this.state",this.state)
    this.onClick = onClick

    $app.appendChild(this.$target)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        console.log(this.state)
        this.$target.innerHTML = `
            <span>
                ${this.state.menus.map((menu)=>`
                ${this.state.selectedMenu === menu.id+""?`<a href="javascript:void(0)" style="color:red" data-index="${menu.id}">${menu.name}</a>`:
                `<a href="javascript:void(0)" style="color:green" data-index="${menu.id}">${menu.name}</a>`}
                `)}
            </span>
            `

        //this.$target.style.display = this.state ? 'block' : 'none'
    }

    this.$target.addEventListener("click", (e)=> {
        const $aItem = e.target.closest("a")
        const {index} = $aItem.dataset
        console.log("event",index);
        console.log("event",this.state);
        this.onClick(index);
    })

    this.render()

}