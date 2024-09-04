import { BsFillHouseFill, BsTable } from 'react-icons/bs';
import { FaMoneyBillWave, FaRegStar } from 'react-icons/fa';
import { IoCard, IoPersonOutline, IoPersonSharp,IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { FaChartSimple, FaGear, FaMoneyBillTransfer, FaPersonCircleCheck } from 'react-icons/fa6';
import { VscServerProcess } from 'react-icons/vsc';
import { MdOutlineMessage, MdOutlineTableChart } from 'react-icons/md';
import { GrGroup } from 'react-icons/gr';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { GoTasklist, GoPeople } from 'react-icons/go';
import { MdOutlineDateRange } from "react-icons/md";
import {
	AiOutlineBook,
	AiOutlineTeam,
	AiOutlineHdd,
	AiOutlineUsergroupAdd,
	AiOutlineCalendar,
	AiOutlineIdcard,
} from 'react-icons/ai';
// tambahkan import untuk ikon lainnya di sini

export const iconMapping: { [key: string]: JSX.Element } = {
	'<BsFillHouseFill />': <BsFillHouseFill />,
	'<FaMoneyBillWave />': <FaMoneyBillWave />,
	'<IoPersonSharp />': <IoPersonSharp />,
	'<FaMoneyBillTransfer />': <FaMoneyBillTransfer />,
	'<FaChartSimple />': <FaChartSimple />,
	'<IoCard />': <IoCard />,
	'<VscServerProcess />': <VscServerProcess />,
	'<FaGear />': <FaGear />,
	'<MdOutlineTableChart />': <MdOutlineTableChart />,
	'<BsTable />': <BsTable />,
	'<FaPersonCircleCheck />': <FaPersonCircleCheck />,
	'<GrGroup />': <GrGroup />,
	'<IoPersonOutline />': <IoPersonOutline />,
	'<FaRegStar />': <FaRegStar />,
	'<MdOutlineMessage />': <MdOutlineMessage />,
	'<CiMoneyCheck1 />': <CiMoneyCheck1 />,
	'<GoTasklist />': <GoTasklist />,
	'<AiOutlineBook />': <AiOutlineBook />,
	'<AiOutlineTeam />': <AiOutlineTeam />,
	'<AiOutlineHdd />': <AiOutlineHdd />,
	'<AiOutlineUsergroupAdd />': <AiOutlineUsergroupAdd />,
	'<AiOutlineCalendar />': <AiOutlineCalendar />,
	'<AiOutlineIdcard />': <AiOutlineIdcard />,
	'<GoPeople />': <GoPeople />,
	'<MdOutlineDateRange />' : <MdOutlineDateRange />,
	'<IoChatbubbleEllipsesOutline />': <IoChatbubbleEllipsesOutline />
	// tambahkan pemetaan untuk ikon lainnya di sini
};
