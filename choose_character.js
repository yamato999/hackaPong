const selectedCharacters = [];
function selectCharacter(characterId) {
    if (selectedCharacters.length < 2) {
      // Limit the selection to two characters
      selectedCharacters.push(characterId);
      const selectedCharacterImage = document.getElementById(
        `selected-character-image-${selectedCharacters.length}`
      );
        if (!selectedCharacterImage.src) {
            selectedCharacterImage.style.display = "none";
        }
      console.log(selectedCharacters)
      selectedCharacterImage.src = `characters/character${characterId}.png`;
      localStorage.setItem('selectedCharacters', JSON.stringify(selectedCharacters));
  
    }
  }

  
