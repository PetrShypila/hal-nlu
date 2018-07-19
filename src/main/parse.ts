import {IApiUtterance, IApiNluOutput, Languages} from "alfred-protocols";
import script from '../../config/model';


const parse = (input: IApiUtterance): IApiNluOutput => {
  const language: Languages = detectLanguage(input.utterance);
  const output: IApiNluOutput = {
    sessionId: input.sessionId,
    language,
    intents: [],
  };


  script[language].intents.forEach((intent) => {
    // Sort intents by number of words in sample
    intent.samples.sort((a, b,): number => {
      if(a.split(" ").length > b.split(" ").length) {
        return -1;
      } else if(b.split(" ").length > a.split(" ").length) {
        return 1;
      }
      return 0;
    });

    intent.samples.some((sample) => {
      let formattedSample = sample;
      const {utterance} = input;

      intent.slots.forEach((slot) => {
        formattedSample = replaceAll(formattedSample, `{${slot.name}}`, script[language].types[slot.name].value);
      });

      const parsedIntents = utterance.match(new RegExp(formattedSample, "ig"));

      if(parsedIntents) {

        parsedIntents.forEach((parsed) => {

          const idxs = locateSlots(sample);
          const slots: string[] = parsed.split(" ").filter((_, idx) => idxs.indexOf(idx) >= 0);
          output.intents.push({
            name: intent.name,
            value: slots,
          });
        });

        return true;
      }

      return false;
    });

  });

  return output;
};

const detectLanguage = (utterance: string): Languages => {
  const germanDetected = utterance.toLowerCase().split(" ").some((word: string): boolean => {
    return word.startsWith("mein");
  });
  return germanDetected ? "german" : "english";
};

const escapeRegExp = (str: string) => {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

const replaceAll = (str: string, find: string, replace: string): string => {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

const locateSlots = (sample: string): number[] => {
  // Split sample by spaces and find indexes of slots
  return sample.split(" ").reduce((accumulator: number[], currentValue: string, currentIndex: number): number[] => {
    if(currentValue.startsWith("{") && currentValue.endsWith("}")) {
      accumulator.push(currentIndex);
    }

    return accumulator;
  }, []);
};

export default parse;
