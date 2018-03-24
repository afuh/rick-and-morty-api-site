import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from "gatsby-link"

import index from '../../data/docs-index.yaml'
import styles from './Sidebar.module.sass'

const ListLink = ({ to, children }) => (
	<li style={{ margin: "0 1rem" }}>
		<Link to={to} style={{color: "#444"}}>
			{children}
		</Link>
	</li>
)

ListLink.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
}

const SectionLinks = ({ items }) => (
	<ul style={{ padding: 0, margin: 0, }}>
		{items.map(item => (
			<ListLink to={item.link} key={item.title}>{item.title}</ListLink>
		))}
	</ul>
)

SectionLinks.propTypes = {
	items: PropTypes.array.isRequired,
}

const Section = ({ title, items }) => (
	<div style={{ marginBottom: "2rem" }}>
		<h3 style={{ margin: '0 0 0.2rem' }}>
			{title}
		</h3>
		<SectionLinks items={items} />
	</div>
)

Section.propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
}


class Sidebar extends Component {
	state = {
		fixed: false,
		sidebar: 0
	}
	componentDidMount(){
		this.header = document.querySelector("header");
		this.footer = document.querySelector("footer");
		this.editPage = document.querySelector("[class*=MarkdownFooter]")

		setTimeout(() => {
			window.addEventListener('scroll', this.handleScroll)
			this.handleScroll();
		}, 500);

	}
	handleScroll = () => {
		const viewBottom = window.scrollY + window.innerHeight

		if (window.scrollY  >= this.header.offsetHeight) {
			this.setState({fixed: true})
		} else {
			this.setState({fixed: false})
		}

		if (viewBottom >= this.footer.offsetTop){
			this.setState({pete: true})
			this.setState({sidebar: viewBottom - (this.footer.offsetTop - this.editPage.offsetHeight - this.props.style.marginTop)})
		}
		else {
			this.setState({sidebar: 0})
			this.setState({pete: false})
		}
	}
	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}
	render(){
		const { fixed, sidebar } = this.state
		const position = fixed ? {
			position: 'fixed',
			top: 0,
			maxHeight: sidebar !== 0 ? `calc(100vh - ${sidebar}px)` : "100vh"
		} : {
			position: 'relative',
		}
		return (
			<aside className={styles.aside} style={Object.assign({marginTop: this.props.style.marginTop}, position)}>
				{index.map(section => (
					<Section {...section} key={section.title} />
				))}
			</aside>
		)
	}
}

Sidebar.propTypes = {
	style: PropTypes.object.isRequired,
}

export default Sidebar;
