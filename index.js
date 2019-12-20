import React, { PureComponent } from 'react'

//Lazy loading img
class Img extends PureComponent {

  constructor (props) {
    super(props)
    this.lazyLoadingImg = React.createRef()
    this.state = {
      isShow: false,
    }
  }

  componentDidMount () {
    this.observer = new IntersectionObserver((list) => {
      list.map(x => {
        if (x.intersectionRatio > 0) {
          this.setState({
            isShow: true,
          })
          this.observer.unobserve(this.lazyLoadingImg.current)
        }
      })
    })
    this.observer.observe(this.lazyLoadingImg.current)
  }

  render () {
    const { defaultImg, img, ...any } = this.props
    const { isShow } = this.state
    return (
      <img
        {...any}
        src={isShow ? img : defaultImg}
        ref={this.lazyLoadingImg}
      />
    )
  }
}

export default Img
