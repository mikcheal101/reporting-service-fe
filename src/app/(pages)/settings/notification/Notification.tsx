
import React from "react";

const Notifications = ()=>{


    return (
        <div>
     
            <div className="mt-4">
                <div className="bg-[#F6F6F3] min-h-screen flex justify-center items-center">
                    <div className="bg-white w-[75%] rounded-md shadow-md p-8">
                        <h1 className="text-xl font-bold mb-6">Update your notification preferences.</h1>

                        <section className="mb-8">
                            <h2 className="text-lg font-semibold mb-4">Notify me when</h2>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center">
                                    <span>Task is assigned to me</span>
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500"/>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>A loan is created</span>
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500"/>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>A loan is approved for payout</span>
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500"/>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span>Borrower is due for payment</span>
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500"/>
                                </li>
                            </ul>
                        </section>

                        <hr className="border-t border-gray-300 mb-8"/>

                        <section>
                            <h2 className="text-lg font-semibold mb-4">Medium</h2>
                            <ul className="space-y-6">
                                <li className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">Email notification</p>
                                        <p className="text-sm text-gray-600">
                                            Receive email notifications whenever your attention is required
                                        </p>
                                    </div>
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500 mt-1"/>
                                </li>
                                <li className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">Mobile push Notification</p>
                                        <p className="text-sm text-gray-600">
                                            Receive mobile notifications whenever your attention is required
                                        </p>
                                    </div>
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500 mt-1"/>
                                </li>
                                <li className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">Desktop Notification</p>
                                        <p className="text-sm text-gray-600">
                                            Receive desktop notifications whenever your attention is required
                                        </p>
                                    </div>
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500 mt-1"/>
                                </li>
                                <li className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">In-app notification</p>
                                        <p className="text-sm text-gray-600">Show notifications in-app</p>
                                    </div>
                                    <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500 mt-1"/>
                                </li>
                            </ul>
                        </section>

                        <div className="flex justify-end mt-8 space-x-4">
                            <button className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded-md">
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Notifications;
