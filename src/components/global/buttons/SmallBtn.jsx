import { ButtonBase } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

function SmallBtn(props) {
	const background = {
		background: props.color ? props.color : '',
	};
	const color = {
		color: props.txtcolor ? props.txtcolor : '',
	};

	return (
		<ButtonBase component="div">
			<SmallButton
				style={{ ...color, ...background }}
				name={props.name}
				value={props.value}
				onClick={(e) => props.onClick(e)}
				disabled={props.disabled}
				className="btn-modern focus-ring"
			>
				{props.text}
			</SmallButton>
		</ButtonBase>
	);
}

const SmallButton = styled.button`
	background: ${props => props.color ? props.color : 'var(--gradient-primary)'};
	outline: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	line-height: 1.5;
	color: ${props => props.txtcolor ? props.txtcolor : 'white'};
	text-align: center;
	cursor: pointer;
	user-select: none;
	border: none;
	padding: 8px 16px;
	font-size: 0.875rem;
	border-radius: var(--radius-md);
	transition: var(--transition-fast);
	position: relative;
	overflow: hidden;
	min-height: 36px;
	
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: var(--transition-normal);
	}
	
	&:hover {
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
		
		&::before {
			left: 100%;
		}
	}
	
	&:active {
		transform: translateY(0);
	}
	
	&:disabled {
		cursor: not-allowed;
		opacity: 0.6;
		transform: none;
		box-shadow: none;
		
		&::before {
			display: none;
		}
	}
	
	@media screen and (max-width: 996px) {
		width: 100%;
		padding: 12px 16px;
	}
`;

export default SmallBtn;