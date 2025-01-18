import { readTextFile } from '../modules/js_xhr_ajax/xhr_ajax.js';

readTextFile(
    {url: '../../json/status.json'},
    jsonFileContent =>
    {
        const json = JSON.parse(jsonFileContent);
        const listOfVersions = document.querySelector('.list-of-versions');
        json.forEach(element =>
        {
            if (element.project)
            {
                if (element.version_current === null) element.version_current = 'N/A';
                if (element.version_target === null) element.version_target = 'N/A';
                if (!element.description) element.description = '';
                else element.description = `<div class='content-block-description'>${element.description}</div>`;

                listOfVersions.innerHTML += `
                    <div class='content-block'>
                        <div class='content-columns'>
                            <div class='content-block-title'>${element.project}</div>
                            <div class='list-of-version-numbers'>
                                <div class='version' title='❓ This is a current version.'>
                                    <div class='icon clock'></div>
                                    <div class='text'>
                                        ${element.version_current}
                                    </div>
                                </div>
                                <div class='version' title='❓ This is a version that should be reached.'>
                                    <div class='icon goal'></div>
                                    <div class='text'>
                                        ${element.version_target}
                                    </div>
                                </div>
                            </div>
                        </div>
                        ${element.description}
                    </div>`;
            }
            else if (element.list_updated)
            {
                const split = element.list_updated.split('-');
                const yearNumber = parseInt(split[0]);
                const monthNumber = parseInt(split[1]);
                const dayNumber = parseInt(split[2]);
                const date = new Date(yearNumber, monthNumber - 1, dayNumber);
                const dateFormatted = date.toLocaleString
                (
                    'default',
                    {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }
                );
                document.querySelector('.list-updated').innerHTML = dateFormatted;
            }
        });
        document.querySelector('input[type="checkbox"].show-project-descriptions').addEventListener('click', (e) => {
            const checkedState = e.currentTarget.checked;
            const bodyClasses = document.querySelector('body').classList;
            const toggleClass = 'show-project-descriptions';

            if (checkedState === true) bodyClasses.add(toggleClass);
            else bodyClasses.remove(toggleClass);
        });
        document.querySelector('body').classList.remove('loading');
    }
);