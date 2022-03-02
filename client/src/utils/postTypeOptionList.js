import LudicoIcon from '@material-ui/icons/MoodOutlined';
import ActualidadIcon from '@material-ui/icons/HistoryOutlined';
import AutocultivoIcon from '@material-ui/icons/EcoOutlined';
import MedicalIcon from '@material-ui/icons/LocalHospitalOutlined';
import EmprendimientoIcon from '@material-ui/icons/WorkOutline';
import LifeStyleIcon from '@material-ui/icons/PeopleAltOutlined';


export const getPostTypeOptionList = () => {  
  return [ 
    {code:"123E6244-C901-43F1-83E0-450014690424", label: "Lúdico / Recreativo", value: "1", icon: LudicoIcon, color:"#344444"},
    {code:"0B02C238-3B6D-4837-B3AF-4D31BB555E87", label: "Actualidad Cannábica", value: "2", icon: ActualidadIcon, color:"#344444"}, 
    {code:"7AA5897A-2071-4F6D-B691-D780D1D251E6", label: "Autocultivo", value: "3", icon: AutocultivoIcon, color:"#344444"},   
    {code:"FF7528CF-2465-43D9-BD1A-CC2247944C69", label: "Medicinal / Investigación", value: "4", icon: MedicalIcon, color:"#344444"},
    {code:"D0E93544-07F2-4545-8F27-E4181F764C65", label: "Emprendimiento", value: "5", icon: EmprendimientoIcon, color:"#344444"},
    {code:"50416504-0545-403B-A2A5-6EACE208D383", label: "Estilo de Vida", value: "6", icon: LifeStyleIcon, color:"#344444"},
  ];
};