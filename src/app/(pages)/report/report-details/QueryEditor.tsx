import React, { useState, useEffect } from "react";
import ControlledEditor from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { buildUrl } from "@/app/utils/urlBuilder";
import { useToast } from "@/hooks/use-toast";
import { useReport } from "@/context/ReportContext";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import { useReportParameter } from "@/context/ParameterContext";
import { useConnection } from "@/context/ConnectionContext";
import { useReportStatus } from "@/hooks/useReportStatus";
import Cookies from "js-cookie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Save, Wand2, Loader2, Code, Sparkles, Settings, Plus, Trash2, Lock } from "lucide-react";
import AIQueryAssistant from "@/components/AIQueryAssistant";

type Parameter = {
  id: string;
  reportId: string;
  name: string;
  value: string;
  dataType: string;
};

interface QueryEditorProps {
  defaultTab?: string;
}

const QueryEditor: React.FC<QueryEditorProps> = ({ defaultTab = "editor" }) => {
  const [query, setQuery] = useState<string>("SELECT * FROM Users WHERE Id = @userId");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [isTestSuccessful, setIsTestSuccessful] = useState(false);
  const [parameters, setParameters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const { currentReportParams } = useReport();
  const { currentParameter } = useReportParameter();
  const { selectedConnection } = useConnection();
  const { isReportCreated, reportId } = useReportStatus();

  const [parameterValues, setParameterValues] = useState<Record<string, string | number | Date>>({});
  const [parameterTypes, setParameterTypes] = useState<Record<string, string>>({});
  const apiUrl = process.env.NEXT_PUBLIC_TEST_QUERY || "";
  const executeUrl = buildUrl(process.env.NEXT_PUBLIC_EXECUTE_QUERY);
  const baseUrl = buildUrl(apiUrl);
  const { toast } = useToast();

//const reportId = safeLocalStorage.getItem("reportId");

  useEffect(() => {
    console.log("current params",currentReportParams)
    if (currentReportParams) {
    //  setReportId(currentReportParams.id);
    }
    
    const types = extractParameterTypes(query);
    setParameterTypes(types);
  }, [query]);

  useEffect(() => {

    if (currentReportParams || currentParameter) {
      const queryString = currentReportParams?.queryString || "";
      setQuery(queryString);

      const params = extractParameters(queryString);
      setParameters(params);

      const types = extractParameterTypes(queryString);
      setParameterTypes(types);

      const newParameterValues: Record<string, string | number | Date> = {};
      const newParameterTypes: Record<string, string> = {};

      params.forEach((param) => {
        // Use the current parameter value if available, otherwise default to empty
        const existingParam = (currentParameter as Parameter[])?.find(p => p.name === param);
        newParameterValues[param] = existingParam?.value ?? "";
        newParameterTypes[param] = existingParam?.dataType || "string";
      });

      setParameterValues(newParameterValues);
      setParameterTypes(newParameterTypes);
      setIsUpdateMode(!!queryString);
    }
  }, [currentReportParams, currentParameter]);



  const extractParameters = (query: string): string[] => {
    const regex = /@\w+/g;
    return Array.from(new Set(query.match(regex) || []));
  };

  const extractParameterTypes = (query: string): Record<string, string> => {
    const regex = /declare\s+(@\w+)\s+As\s+(\w+)/g;
    const parameterTypes: Record<string, string> = {};
    let match;
    while ((match = regex.exec(query)) !== null) {
      parameterTypes[match[1]] = match[2];
    }
    return parameterTypes;
  };

  const sqlToJsTypeMap: Record<string, string> = {
    DATE: "date",
    DECIMAL: "double",
    FLOAT: "double",
    NVARCHAR: "string",
    VARCHAR: "string",
    INT: "string",
  };


  const handleEditorChange = (value?: string) => {
    if (value !== undefined) {
      setQuery(value);
      const params = extractParameters(value);
      setParameters(params);

      const types = extractParameterTypes(value);
      setParameterTypes(types);

      // Ensure all parameters have an initial value
      setParameterValues((prev) =>
        params.reduce((acc, param) => {
          acc[param] = prev[param] ?? ""; // Use the existing value or initialize to an empty string
          return acc;
        }, {} as Record<string, string | number | Date>)
      );
    }
  };

  const handleParameterChange = (param: string, value: string) => {
    const type = sqlToJsTypeMap[parameterTypes[param]] || "string";
    let convertedValue: string | number | Date = value;

    switch (type) {
      case "double":
        convertedValue = parseFloat(value);
        if (isNaN(convertedValue)) convertedValue = 0.0; // Default to 0.0 for invalid doubles
        break;
      case "date":
        convertedValue = new Date(value);
        if (isNaN(convertedValue.getTime())) {
          convertedValue = ""; // Default to an empty value for invalid dates
        } else {
          convertedValue = convertedValue.toISOString().slice(0, 10);
        }
        break;
      case "number":
        convertedValue = parseInt(value).toString();
        break;
      case "string":
      default:
        convertedValue = value.trim(); // Treat as string and trim whitespace
    }

    setParameterValues((prev) => ({
      ...prev,
      [param]: convertedValue,
    }));
  };

  const handleSubmit = async (action: "test" | "execute") => {
    setIsLoading(true);
    try {
      const authToken = Cookies.get('authToken');
      const formattedQuery = query.replace(/\n/g, " ").trim();

      // Create the parameters array with name, value, and dataType
      const formattedParameters = parameters.map((param) => ({
        name: param,
        value: parameterValues[param],
        dataType: parameterTypes[param]?.toUpperCase() || "STRING",
      }));

      const payload = {
        isFromQueryBuilder: true,
        reportId:reportId,
        limit: 1,
        queryString: formattedQuery,
        parameters: formattedParameters,  // Use formattedParameters here
        joins: [],
        computedColumns: [],
        filters: [],
      };

      console.log("Test", payload);
      console.log("Test", payload.reportId);

      const endpoint = action === "test" ? baseUrl : executeUrl;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIsTestSuccessful(true);

      console.log(data.id)
      setResult(JSON.stringify(data, null, 2));
      toast({
        title: "Success",
        description: `Query ${action} completed successfully.`,
        duration: 5000,
      });
    } catch (error: any) {
      setIsTestSuccessful(false);
      toast({
        title: "Error",
        description: error.message || `Failed to ${action} query.`,
        duration: 5000,
      });
      setResult(`Error ${action === "test" ? "testing" : "executing"} query.`);
    } finally {
      setIsLoading(false);
    }
  };
  const handleExecuteSubmit = async (action: "execute") => {
    setIsLoading(true);
    try {
      const authToken = Cookies.get('authToken');
      const formattedQuery = query.replace(/\n/g, " ").trim();

      // Create the parameters array with name, value, and dataType
      const formattedParameters = parameters.map((param) => ({
        name: param,
        value: parameterValues[param],
        dataType: parameterTypes[param]?.toUpperCase() || "STRING",
      }));

      const payload = {
        isFromQueryBuilder: true,
        reportId:reportId,
        limit: 1,
        queryString: formattedQuery,
        parameters: formattedParameters,  // Use formattedParameters here
        joins: [],
        computedColumns: [],
        filters: [],
      };

      console.log(payload);

      const response = await fetch(executeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error saving report details! status: ${response.status}`);
      }

      const data = await response.json();

      setResult(JSON.stringify(data, null, 2));
      toast({
        title: "Success",
        description: `Query executed completed successfully.`,
        duration: 5000,
      });
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || 'Failed to execute query.',
        duration: 5000,
      });
      setResult('Error executing query.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateSubmit = async (action: "execute") => {
    setIsLoading(true);
    try {
      const authToken = Cookies.get("authToken");
      const formattedQuery = query.replace(/\n/g, " ").trim();

      const formattedParameters = parameters.map((param) => ({
        name: param,
        value: parameterValues[param],
        dataType: parameterTypes[param]?.toUpperCase() || "STRING",
      }));

      const payload = {
        isFromQueryBuilder: true,
        reportId:reportId,
        limit: 1,
        queryString: formattedQuery,
        parameters: formattedParameters,
        joins: [],
        computedColumns: [],
        filters: [],
      };

      console.log(payload);

      const response = await fetch(`${executeUrl}/${reportId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      console.log(response);
      console.log(response.status);

      if (response.status === 204) {
        setResult("Query executed successfully, but no content returned.");
      } else {
        const data = await response.json();
        setResult(JSON.stringify(data, null, 2));
      }

      toast({
        title: "Success",
        description: `Query executed successfully.`,
        duration: 5000,
      });

      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to execute query.",
        duration: 5000,
      });
      setResult("Error executing query.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIQueryGenerated = (generatedQuery: string) => {
    setQuery(generatedQuery);
    setActiveTab("editor");
    
    const params = extractParameters(generatedQuery);
    setParameters(params);
    
    const types = extractParameterTypes(generatedQuery);
    setParameterTypes(types);
    
    setParameterValues((prev) =>
      params.reduce((acc, param) => {
        acc[param] = prev[param] ?? "";
        return acc;
      }, {} as Record<string, string | number | Date>)
    );
  };

  const [manualParameters, setManualParameters] = useState<Array<{name: string, value: string, dataType: string}>>([]);

  const addManualParameter = () => {
    const newParam = {
      name: `@param${manualParameters.length + 1}`,
      value: "",
      dataType: "STRING"
    };
    setManualParameters(prev => [...prev, newParam]);
  };

  const removeManualParameter = (index: number) => {
    setManualParameters(prev => prev.filter((_, i) => i !== index));
  };

  const updateManualParameter = (index: number, field: 'name' | 'value' | 'dataType', value: string) => {
    setManualParameters(prev => prev.map((param, i) => 
      i === index ? { ...param, [field]: value } : param
    ));
  };

  // Combine detected and manual parameters
  const getAllParameters = () => {
    const detectedParams = parameters.map(param => ({
      name: param,
      value: parameterValues[param]?.toString() || "",
      dataType: parameterTypes[param] || "STRING",
      isDetected: true
    }));
    
    const manualParams = manualParameters.map(param => ({
      ...param,
      isDetected: false
    }));
    
    return [...detectedParams, ...manualParams];
  };

  // Locked state component
  const LockedEditor = ({ title, description }: { title: string; description: string }) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Lock className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Editor Locked</h3>
          <p className="text-sm text-gray-500 mb-4 max-w-md">
            {description}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> Complete the report form in the sidebar to unlock this editor.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor" className="flex items-center gap-2 text-xs sm:text-sm">
            <Code className="w-3 h-3 sm:w-4 sm:h-4" />
            SQL Editor
          </TabsTrigger>
        
          <TabsTrigger value="ai" className="flex items-center gap-2 text-xs sm:text-sm">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            AI Assistant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          {!isReportCreated ? (
            <LockedEditor 
              title="SQL Query Editor" 
              description="Please create and save a report first before using the SQL editor. This ensures your queries are properly associated with a report and prevents testing errors."
            />
          ) : (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                  SQL Query Editor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Code Editor */}
                <div className="border rounded-md overflow-hidden">
                  <ControlledEditor
                    value={query}
                    onChange={handleEditorChange}
                    extensions={[sql()]}
                    className="min-h-[200px] sm:min-h-[300px] text-sm"
                    basicSetup={{
                      lineNumbers: true,
                      foldGutter: true,
                      dropCursor: false,
                      allowMultipleSelections: false,
                    }}
                  />
                </div>

                {/* Parameters Section - Always Visible */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Parameters</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addManualParameter}
                      className="text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Parameter
                    </Button>
                  </div>
                  
                  {getAllParameters().length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {getAllParameters().map((param, index) => (
                        <div key={`${param.name}-${index}`} className="p-3 border rounded-lg bg-gray-50 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-1 rounded ${
                                param.isDetected 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {param.isDetected ? 'Auto-detected' : 'Manual'}
                              </span>
                              <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                                {param.dataType}
                              </span>
                            </div>
                            {!param.isDetected && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeManualParameter(index - parameters.length)}
                                className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div className="space-y-1">
                              <Label className="text-xs text-gray-600">Parameter Name</Label>
                              {param.isDetected ? (
                                <Input
                                  value={param.name}
                                  disabled
                                  className="text-sm bg-gray-100"
                                />
                              ) : (
                                <Input
                                  value={param.name}
                                  onChange={(e) => updateManualParameter(index - parameters.length, 'name', e.target.value)}
                                  placeholder="@paramName"
                                  className="text-sm"
                                />
                              )}
                            </div>
                            
                            <div className="space-y-1">
                              <Label className="text-xs text-gray-600">Data Type</Label>
                              {param.isDetected ? (
                                <Input
                                  value={param.dataType}
                                  disabled
                                  className="text-sm bg-gray-100"
                                />
                              ) : (
                                <Select
                                  value={param.dataType}
                                  onValueChange={(value) => updateManualParameter(index - parameters.length, 'dataType', value)}
                                >
                                  <SelectTrigger className="text-sm">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="STRING">STRING</SelectItem>
                                    <SelectItem value="INT">INT</SelectItem>
                                    <SelectItem value="DECIMAL">DECIMAL</SelectItem>
                                    <SelectItem value="DATE">DATE</SelectItem>
                                    <SelectItem value="NVARCHAR">NVARCHAR</SelectItem>
                                    <SelectItem value="VARCHAR">VARCHAR</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                            
                            <div className="space-y-1">
                              <Label className="text-xs text-gray-600">Value</Label>
                              <Input
                                type={sqlToJsTypeMap[param.dataType] === "date" ? "date" : "text"}
                                placeholder={`Enter value for ${param.name}`}
                                value={param.isDetected 
                                  ? (parameterValues[param.name]?.toString() || "")
                                  : param.value
                                }
                                onChange={(e) => {
                                  if (param.isDetected) {
                                    handleParameterChange(param.name, e.target.value);
                                  } else {
                                    updateManualParameter(index - parameters.length, 'value', e.target.value);
                                  }
                                }}
                                className="text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                      <Settings className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No parameters defined</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Add parameters manually or use @ syntax in your query
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Button
                    onClick={() => handleSubmit("test")}
                    disabled={isLoading}
                    className="flex-1 text-sm"
                    variant="outline"
                  >
                    {isLoading ? (
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    )}
                    Test Query
                  </Button>
                  <Button
                    onClick={() => handleSubmit("execute")}
                    disabled={isLoading || !isTestSuccessful}
                    className="flex-1 text-sm"
                  >
                    <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Save Query
                  </Button>
                </div>

                {/* Results */}
                {result && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium mb-2 block">Query Result</Label>
                    <div className="bg-gray-50 p-3 rounded-md border max-h-[200px] overflow-auto">
                      <pre className="text-xs whitespace-pre-wrap">{result}</pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

       

        <TabsContent value="ai" className="space-y-4">
          {!isReportCreated ? (
            <LockedEditor 
              title="AI Query Assistant" 
              description="The AI Query Assistant requires an active report context to generate relevant queries. Please create a report first to access AI-powered query generation."
            />
          ) : (
            <AIQueryAssistant onQueryGenerated={handleAIQueryGenerated} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QueryEditor;
