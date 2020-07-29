import React, { useState } from 'react';







function  Terminal(props) {
    
    const [command,setCommand]=useState("");
    const [lines,setLines]=useState([]);
 
  

  function help(){
       
        return `clear - cleans the terminal\n\n Duser [username] - delete user by username\n\n Dorgasm [title] - delete orgasm by title\n\n setRole [username] [role {ADMIN,GUEST,USER}]\n\n
 setPending [orgasmTitle] - toggle pending state of an Orgasm
        \n setOrgasmTitle [title] \n\n setOrgasmFile (Choose File Audio/Video)\n\n submit - creates Orgasm AFTER ALL PROPS ARE FILLED (Title & File)\n\n `
    }
    

 async function executeLine(e){
      if(e.keyCode===13){

        const trimmedCommand=command.trim();

        if(trimmedCommand==="clear"){
            setLines([]);
        }else{
        
        const input = trimmedCommand.split(" ");
        const cmd=input[0];
     
        let name;
        let data
       let retMsg="Invalid command type help for more info";
        switch(cmd){
            case "findU":
             name=trimmedCommand.slice(6);
          data = await props.methods.find(name);
             if(!data.id){
                retMsg=`${name} doesn't exists`
             }else{    
                 retMsg=`ID: ${data.id}\nUsername: ${data.username}\nRoles: ${data.authorities.join(", ")}\nOrgasms:\n`
                 data.orgasms.forEach(e=>{ retMsg+= `ID: ${e.id}\n Title: ${e.title}\n Pending: ${e.pending}\n${e.videoUrl}\n`})
             }  
            break;

            case "findO":
                name=trimmedCommand.slice(6);
                 data = await props.methods.findOrgasm(name);
                if(!data.id){
                   retMsg=`${name} doesn't exists`
                }else{    
                    retMsg=`ID: ${data.id}\nTitle:${data.title}\nVideoUrl:${data.videoUrl}\nPending:${data.pending.toString()}`
                }  
            break;

            case "Duser":
                  name=trimmedCommand.slice(6);
                 retMsg=await props.methods.delete("user",name);
                break;
            case "Dorgasm":
                name=trimmedCommand.slice(8);
                retMsg=await props.methods.delete("orgasm",name);
                break;
            case "setRole":
                    let role= input[1];
                    let pos= trimmedCommand.indexOf(role);
                    name=trimmedCommand.slice(pos+role.length+1);
                    retMsg=await props.methods.setRole(name,role);
                break;
            case "setPending":
                  name=trimmedCommand.replace(cmd+" ","");
                retMsg= await props.methods.setPending(name);
               
                
            break;
            case "setOrgasmTitle":
            
                    let title = input[1];
                   
                    retMsg=await props.methods.setOrgasmTitle(title);
                   
               break;

               case "setOrgasmFile":
                   retMsg=await props.methods.setOrgasmFile();
               break;

            case "submit":
                     retMsg=await props.methods.submit();
               break;

            case "help":         
            retMsg= help();            
                break;
                
        }

      
        setLines([...lines,{
            id:lines.length,
            value:retMsg,
            
        }])

     
    }
    setCommand("");
      }
   
  }
  
    return(
      <>
        <pre className="pre-terminal">
       
        <p className="terminal-intro">Terminal V1 </p>
    {lines.map(e=>(<div key={e.id} className="command-line"> {e.value} </div>))}
       <div className="current-command-line">Admin:<textarea rows={1} cols={1} onChange={(e)=>setCommand(e.target.value)} onKeyDown={executeLine} value={command}></textarea></div> 
        </pre>
           

       </>
    )
}

export default Terminal;