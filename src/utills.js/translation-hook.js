import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTranslations, saveLangCode } from "../redux/actions";

const { useSelector, useDispatch } = require("react-redux");

export const useTranslation = () => {
    const dispatch = useDispatch();

    const Translation = useSelector(state => state.AppReducers.translationData);
    const selectedLang = useSelector(state => state.AppReducers.selectedLangCode);

    const handleUpdateLanuage = (params) => {
        dispatch(getTranslations(params));
    }

    const handleSelectedLanguage = async (data) => {
        await AsyncStorage.setItem('currentLang', JSON.stringify(data))
        dispatch(saveLangCode(data));
    }

    const handleDefaultLanguage = async () => {
        const lang = await AsyncStorage.getItem('currentLang')
        return lang ? JSON.parse(lang) : selectedLang
    }

    return {
        Translation,
        handleUpdateLanuage,
        selectedLang,
        handleSelectedLanguage,
        handleDefaultLanguage
    }
}