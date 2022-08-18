'use strict';

// When page loads
document.addEventListener("DOMContentLoaded", () => {

	// Toggle splash screen
	const wrapper = document.querySelector(".wrapper")
	wrapper.addEventListener("click", (e) => {
		e.preventDefault()
		wrapper.classList.remove('splash')
	});

	// /////////////////////////////////////////////////////////////////////////////

	// References
	const conversation = document.querySelector(".conversation")
	const selection_box = document.querySelector(".selection-box")
	const selection_cancel_box = document.querySelector(".selection-cancel")

	// Opener for fillables
	document.querySelectorAll(".fillable").forEach(fillable => fillable.addEventListener("click",(e) => {

		// Get data
		const options = fillable.dataset.options.split(",")
		const position = fillable.getBoundingClientRect()

		// Style and populate selection box
		selection_box.classList.add("show")
		selection_cancel_box.classList.add("show")

		selection_box.innerHTML = ""
		for(let option of options){
			selection_box.insertAdjacentHTML('beforeend',`<span class="option">${option}</span>`)
		}
		const selection_box_width = selection_box.getBoundingClientRect().width
		const selection_box_left = position.left + (position.width/2) - (selection_box_width/2)

		// Style parent message
		clear_selected(fillable)
		fillable.parentElement.classList.add('selected')
		fillable.classList.add('selected')

		selection_box.style.top = `${position.bottom}px`
		selection_box.style.left = `${selection_box_left}px`

		// Selection of fillables element
		selection_box.querySelectorAll(".option").forEach(option => option.addEventListener("click",(e) => {
			e.preventDefault();
			clear_selected(fillable)
			set_fillable(fillable, option.textContent)
		}));

	}));

	// Load next message
	function load_message_after(message){
		const next_message = message.nextElementSibling
		if(next_message){
			
			next_message.classList.add("show")
			check_scroll_overflow()

			if(next_message.classList.contains("walter")){
				if(next_message.classList.contains("loading")){
					setTimeout(() => {
						next_message.classList.add("loaded");
						load_message_after(message.nextElementSibling)
					}, 1500);
				}else{
					setTimeout(() => {
						load_message_after(message.nextElementSibling)
					}, 700);
				}
			}
		}
	}

	setTimeout(() => {
		load_message_after(document.querySelector(".first-conversation-marker"))
	}, 100);
	
	// Cancel action
	selection_cancel_box.addEventListener("click",(e) => {
		clear_selected()
		selection_box.classList.remove("show")
		selection_cancel_box.classList.remove("show")
	});

	// Clear selections
	function clear_selected(fillable){
		document.querySelectorAll(".fillable, .message").forEach(elm => elm.classList.remove('selected'))
	}

	// Triggers when fillable is filled
	function set_fillable(fillable, value){

		// Set values on box
		fillable.textContent = value;
		fillable.classList.add("filled");

		// Hide selection box
		selection_box.classList.remove("show")
		selection_cancel_box.classList.remove("show")

		// Advance if all the fillables are filled
		// Clever one-liner again, well done George :)
		if(Array.from(fillable.parentElement.querySelectorAll('.fillable')).reduce((result, fillable) => (result & fillable.classList.contains("filled")), true)){
			load_message_after(fillable.parentElement);
		}
	}

	// Scroll downwards
	function check_scroll_overflow(){
		conversation.scrollTop = conversation.scrollHeight;
	}

});
