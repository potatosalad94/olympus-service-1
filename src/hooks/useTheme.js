import { useEffect } from "react";

const useTheme = (primaryColor) => {
	const lightenColor = (color, percent) => {
		const num = parseInt(color.replace("#", ""), 16);
		const amt = Math.round(2.55 * percent);
		const R = (num >> 16) + amt;
		const G = ((num >> 8) & 0x00ff) + amt;
		const B = (num & 0x0000ff) + amt;
		return `#${(
			0x1000000 +
			(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
			(G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
			(B < 255 ? (B < 1 ? 0 : B) : 255)
		)
			.toString(16)
			.slice(1)}`;
	};

	const darkenColor = (color, percent) => {
		const num = parseInt(color.replace("#", ""), 16);
		const amt = Math.round(2.55 * percent);
		const R = (num >> 16) - amt;
		const G = ((num >> 8) & 0x00ff) - amt;
		const B = (num & 0x0000ff) - amt;
		return `#${(
			0x1000000 +
			(R > 0 ? (R > 255 ? 255 : R) : 0) * 0x10000 +
			(G > 0 ? (G > 255 ? 255 : G) : 0) * 0x100 +
			(B > 0 ? (B > 255 ? 255 : B) : 0)
		)
			.toString(16)
			.slice(1)}`;
	};

	useEffect(() => {
		if (primaryColor) {
			document.documentElement.style.setProperty("--primary-color", primaryColor);
			// Create a <style> element
			const style = document.createElement("style");
			style.innerHTML = `
            /* Buttons */
            .p-button {
              background-color: ${primaryColor} !important;
              border-color: ${primaryColor} !important;
              color: #ffffff !important; /* Ensure text is readable */
            }
            .p-button:enabled:hover  {
              background-color: ${darkenColor(primaryColor, 10)} !important; /* Darken on hover */
              border-color: ${darkenColor(primaryColor, 10)} !important;
            }
            .p-button:enabled:focus {
                box-shadow: 0 0 0 0.2rem ${lightenColor(primaryColor, 50)} !important;
            }

            /* Inputs */
            .p-inputtext:enabled:hover {
              border-color: ${primaryColor} !important;

            }
            .p-inputtext:enabled:focus {
              border-color: ${primaryColor} !important;
              box-shadow: 0 0 0 0.2rem ${lightenColor(
					primaryColor,
					50
				)} !important; /* Add a focus glow */
            }

            /* Dropdowns */
            .p-dropdown:not(.p-disabled).p-focus {
              border-color: ${primaryColor} !important;
              box-shadow: 0 0 0 0.2rem ${lightenColor(primaryColor, 50)} !important;
            }
            .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
              background-color: ${primaryColor} !important;
              color: #ffffff !important;
            }

            /* Checkboxes */
            .p-checkbox .p-checkbox-box.p-highlight {
              background-color: ${primaryColor} !important;
              border-color: ${primaryColor} !important;
            }

            /* Radio Buttons */
            .p-radiobutton .p-radiobutton-box.p-highlight {
              background-color: ${primaryColor} !important;
              border-color: ${primaryColor} !important;
            }

            /* Tabs */
            .p-tabview .p-tabview-nav li .p-tabview-nav-link {
              color: ${primaryColor} !important;
            }
            .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
              border-color: ${primaryColor} !important;
            }

            /* Menus */
            .p-menuitem-link:focus {
              box-shadow: 0 0 0 0.2rem ${lightenColor(primaryColor, 50)} !important;
            }
            .p-menuitem-link.p-menuitem-link-active {
              background-color: ${primaryColor} !important;
              color: #ffffff !important;
            }

            /* Tables */
            .p-datatable .p-sortable-column.p-highlight {
              background-color: ${primaryColor} !important;
              color: #ffffff !important;
            }
            .p-datatable .p-sortable-column.p-highlight:hover {
              background-color: ${darkenColor(primaryColor, 10)} !important;
            }

            /* Progress Bars */
            .p-progressbar .p-progressbar-value {
              background-color: ${primaryColor} !important;
            }

            /* Messages */
            .p-message.p-message-info {
              background-color: ${lightenColor(primaryColor, 50)} !important;
              border-color: ${primaryColor} !important;
              color: ${primaryColor} !important;
            }

          `;

			// Append the <style> element to the document head
			document.head.appendChild(style);

			// Cleanup: Remove the <style> element when the component unmounts
			return () => {
				document.head.removeChild(style);
			};
		}
	}, [primaryColor]);
};

export default useTheme;
