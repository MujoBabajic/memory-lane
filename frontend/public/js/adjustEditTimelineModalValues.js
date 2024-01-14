document.addEventListener("DOMContentLoaded", function () {
  let isPrivate;

  if (privateStatus == 1) isPrivate = "true";
  else isPrivate = "false";

  const timelineStyles = {
    is_private: isPrivate,
    text_font: text_font,
    bg_color: bgColor,
  };

  function setSelectedValue(selectId, value) {
    const selectElement = document.getElementById(selectId);
    const options = selectElement.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].value == value) {
        options[i].selected = true;
        break;
      }
    }
  }

  setSelectedValue("edit-timeline-privacy", timelineStyles.is_private);
  setSelectedValue("edit-timeline-font", timelineStyles.text_font);
  setSelectedValue("edit-timeline-background-color", timelineStyles.bg_color);
});
