//////////////////////////////// 
// 
//   Copyright 2018 Battelle Energy Alliance, LLC  
// 
// 
//////////////////////////////// 
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataLayer
{
    using System;
    using System.Collections.Generic;
    
    public partial class CUSTOM_QUESTIONAIRES
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CUSTOM_QUESTIONAIRES()
        {
            this.CUSTOM_BASE_STANDARDS = new HashSet<CUSTOM_BASE_STANDARDS>();
            this.CUSTOM_QUESTIONAIRE_QUESTIONS = new HashSet<CUSTOM_QUESTIONAIRE_QUESTIONS>();
        }
    
        public string Custom_Questionaire_Name { get; set; }
        public string Description { get; set; }
        public string Set_Name { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CUSTOM_BASE_STANDARDS> CUSTOM_BASE_STANDARDS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CUSTOM_QUESTIONAIRE_QUESTIONS> CUSTOM_QUESTIONAIRE_QUESTIONS { get; set; }
    }
}

