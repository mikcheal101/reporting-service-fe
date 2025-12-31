'use client'
import Card from "@/components/Card";
import BarChart from "@/components/BarChart";
import ReportTypeTable from "@/components/ReportTypeTable";


const Dashboard: React.FC = () => {
    return(
        <main className="p-6 bg-gray-100 flex-1 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-4">
                        <Card title="Total Reports Generated" value="2,847" date="This Month" change="12%" />
                        <Card title="Active Connections" value="24" date="Today" change="3%" />
                        <Card title="Scheduled Reports" value="156" date="This Week" change="5%" />
                        <Card title="Success Rate" value="98.7%" date="Last 30 Days" change="2%" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <BarChart />
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-4">Report Execution Status</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Successful</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '87%'}}></div>
                                        </div>
                                        <span className="text-sm font-medium">87%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">In Progress</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '8%'}}></div>
                                        </div>
                                        <span className="text-sm font-medium">8%</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Failed</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div className="bg-red-500 h-2 rounded-full" style={{width: '5%'}}></div>
                                        </div>
                                        <span className="text-sm font-medium">5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ReportTypeTable />
                </main>
    )
}
export default Dashboard;