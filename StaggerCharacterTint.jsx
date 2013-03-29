//SplitStory.jsx
//An InDesign CS6 JavaScript
/*  
@@@BUILDINFO@@@ "SplitStory.jsx" 3.0.0 15 December 2009
*/
//Splits the selected story into separate (i.e., unthreaded) text frames.
//To use this script, select a text frame, then run the script.
//
//Note: Any overset text at the end of the story will be deleted.
//Note: Hyphenation points between text frames will not be retained.
//
//For more on InDesign scripting, go to http://www.adobe.com/products/indesign/scripting/index.html
//or visit the InDesign Scripting User to User forum at http://www.adobeforums.com
//
main();
function main(){
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	if(app.documents.length != 0){
		if(app.selection.length != 0){
			//Get the first item in the selection.
			var mySelection = app.selection[0];
			//Process the selection. If text or a text frame is 
			//selected, do something; otherwise, do nothing.
			switch(mySelection.constructor.name){
				case "Text":
				case "InsertionPoint":
				case "Character":
				case "Word":
				case "Line":
				case "TextStyleRange":
				case "Paragraph":
				case "TextColumn":
				case "TextFrame":
					//If the text frame is the only text frame in the story, do nothing.
					//Splitting the story is a two-step process: first, duplicate
					//the text frames, second, delete the original text frames.
					myShiftChars(mySelection);
					//mySplitStory(mySelection);
					//myRemoveFrames(mySelection.parentStory);
					break;
				default:
					alert("Please select some text or a text frame and try again.");
			}
		}
		else{
			alert("Please select some text or a text frame and try again.");
		}
	}
	else{
		alert("Please open a document and try again.");
	}
}

function myShiftChars(myStory){
	var myLabelWidth = 90;
	var myDialog = app.dialogs.add({name:'StaggerCharacterTint'});
	with(myDialog.dialogColumns.add()){
		with(dialogRows.add()){
			with(dialogColumns.add()){
				staticTexts.add({staticLabel:'Min:', minWidth:myLabelWidth});
				staticTexts.add({staticLabel:'Max:', minWidth:myLabelWidth});
			}
			with(dialogColumns.add()){
				var myMinField = integerEditboxes.add({editValue:30});
				var myMaxField = integerEditboxes.add({editValue:90});
			}
		}
	}
	var myResult = myDialog.show();
	if (myResult == true){
		var min = myMinField.editValue;
		var max = myMaxField.editValue;
	}
	var chars = myStory.characters;
	var diff = max - min;
	for (var i = 0; i<chars.length; i++){
		chars[i].fillTint = Math.random() * diff + min;
	}
}