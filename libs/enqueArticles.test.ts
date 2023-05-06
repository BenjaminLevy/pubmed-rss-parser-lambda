import {enqueArticles} from './enqueArticles'

describe('enqueArticles', () => {
  test('async/await-based test', async () => {
  expect.assertions(1);
    try {
      const res = await enqueArticles(articlesArr, {})
      expect(res).toBe('success')
      
    } catch (e) {
      console.log(e)
      // expect(e.message).toMatch('Invalid URL');
    }
  });
});



const articlesArr = [{"title":"A novel solution to tartrate instability in white wines","description":"Tartrate stabilization remains a necessary step in commercial wine production to avoid the precipitation of crystals in bottled wine. The conventional refrigeration method to prevent crystallization of potassium bitartrate is time-consuming, energy-intensive, and involves a filtration step to remove the sediment. Nevertheless, it is still the most used stabilization method by winemakers. This work exploits for the first time an alternative to traditional cold stabilization that explores the...","author":{"name":"Panthihage Ruvini Dabare et al."},"pmid":"37146354","url":"https://pubmed.ncbi.nlm.nih.gov/37146354","doi":"10.1016/j.foodchem.2023.136159","sortKey":"10.1016/j.foodchem.2023.136159"},{"title":"Quantitative proteomics profiling of plasma from children with asthma","description":"A lack of validated blood diagnostic markers presents an obstacle to asthma control. The present study sought to profile the plasma proteins of children with asthma and to determine potential biomarkers. Plasma samples from children in acute exacerbation (n = 4), in clinical remission (n = 4), and from healthy children (n = 4, control) were analyzed using a tandem mass tag (TMT)-labeling quantitative proteomics and the candidate biomarkers were validated using liquid chromatography-parallel...","author":{"name":"Ying Zhou et al."},"pmid":"37146352","url":"https://pubmed.ncbi.nlm.nih.gov/37146352","doi":"10.1016/j.intimp.2023.110249","sortKey":"10.1016/j.intimp.2023.110249"},{"title":"Development and effects of an internet-based family resilience-promoting program for parents of children with cancer: A randomized controlled trial","description":"CONCLUSIONS: The applicability of the internet-based family resilience-promoting program as an appropriate nursing intervention was verified. Its application can help the families of children with cancer adapt to the stressful situation of their children's cancer diagnosis and treatment.","author":{"name":"Mina Park et al."},"pmid":"37146351","url":"https://pubmed.ncbi.nlm.nih.gov/37146351","doi":"10.1016/j.ejon.2023.102332","sortKey":"10.1016/j.ejon.2023.102332"},{"title":"Emotional distress, supportive care needs and age in the prediction of quality of life of cancer patients' caregivers: A cross-sectional study","description":"CONCLUSION: This study shows the necessity to support caregivers during both active treatment and follow-up. It highlights the crucial role of emotional distress, supportive care and age in caregivers' QoL, regardless of the patients' oncological status.","author":{"name":"Anne-Sophie Baudry et al."},"pmid":"37146349","url":"https://pubmed.ncbi.nlm.nih.gov/37146349","doi":"10.1016/j.ejon.2023.102324","sortKey":"10.1016/j.ejon.2023.102324"},{"title":"The effect of Artemisia annua L. extract on microbiologically influenced corrosion of A36 steel caused by Pseudomonas aeruginosa","description":"The protective effect of A. annua against microbiologically influenced corrosion (MIC) of A36 steel caused by P. aeruginosa (PA) in a simulated marine environment was investigated using electrochemical, spectroscopic, and surface techniques. PA was found to accelerate the local dissolution of A36 which led to the formation of a porous α-FeOOH and γ-FeOOH surface layer. 2D and 3D profiles of treated coupons, obtained by optical profilometer, revealed the formation of crevices in the presence of...","author":{"name":"Gloria Zlatić et al."},"pmid":"37146346","url":"https://pubmed.ncbi.nlm.nih.gov/37146346","doi":"10.1016/j.bioelechem.2023.108447","sortKey":"10.1016/j.bioelechem.2023.108447"},{"title":"Phosphorus doping significantly enhanced the catalytic performance of cobalt-single-atom catalyst for peroxymonosulfate activation and contaminants degradation","description":"Increasing studies have been conducted to explore strategies for enhancing the catalytic performance of metal-doped C-N-based materials (e.g., cobalt (Co)-doped C(3)N(5)) via heteroatomic doping. However, such materials have been rarely doped by phosphorus (P) with the higher electronegativity and coordination capacity. In current study, a novel P and Co co-doped C(3)N(5) (Co-xP-C(3)N(5)) was developed for peroxymonosulfate (PMS) activation and 2,4,4'-trichlorobiphenyl (PCB28) degradation. The...","author":{"name":"Ning Chen et al."},"pmid":"37146341","url":"https://pubmed.ncbi.nlm.nih.gov/37146341","doi":"10.1016/j.jhazmat.2023.131480","sortKey":"10.1016/j.jhazmat.2023.131480"},{"title":"Synergy among extracellular adsorption, bio-precipitation and transmembrane transport of Penicillium oxalicum SL2 enhanced Pb stabilization","description":"As a potential bioremediation strain for Pb contamination, Penicillium oxalicum SL2 sometimes has secondary activation of Pb, so it is crucial to clarify its effect on Pb morphology and its intracellular response to Pb stress. We investigated the effect of P. oxalicum SL2 in medium on Pb^(2+) and Pb availability in eight minerals, and revealed the prioritization of Pb products. (i)Pb was stabilized within 30 days as Pb(3)(PO(4))(2) or Pb(5)(PO(4))(3)Cl with sufficient phosphorus (P); (ii) under...","author":{"name":"Jianhao Tong et al."},"pmid":"37146333","url":"https://pubmed.ncbi.nlm.nih.gov/37146333","doi":"10.1016/j.jhazmat.2023.131537","sortKey":"10.1016/j.jhazmat.2023.131537"},{"title":"Trends in Patient-Reported Outcomes Reporting in Breast Reconstruction: A Scoping Literature Review","description":"CONCLUSIONS: This study demonstrates that only one-fourth of breast reconstruction articles report the use of PROMs with no interval increase over recent years. Patient-reported outcome measures were predominantly used retrospectively and postoperatively with notable variation in timing of administration. The findings highlight the need for improved frequency and consistency of PROM collection and reporting, as well as for further exploration into barriers and facilitators of PROM use.","author":{"name":"Sonali Biswas et al."},"pmid":"37146316","url":"https://pubmed.ncbi.nlm.nih.gov/37146316","doi":"10.1097/SAP.0000000000003545","sortKey":"10.1097/SAP.0000000000003545"},{"title":"Stem Cell-Enriched Fat Grafts Versus Autologous Fat Grafts for Facial Reconstruction: A Systematic Review and Meta-analysis","description":"CONCLUSIONS: Stem cell-enriched fat grafting is a superior option when compared with the routine fat grafting for facial reconstruction surgery because it improves the mean volume retention and does not worsen patient satisfaction and surgical complications.","author":{"name":"Mohammad Karam et al."},"pmid":"37146315","url":"https://pubmed.ncbi.nlm.nih.gov/37146315","doi":"10.1097/SAP.0000000000003553","sortKey":"10.1097/SAP.0000000000003553"},{"title":"Visual Attention, Bias, and Social Dispositions Toward People With Facial Anomalies: A Prospective Study With Eye-Tracking Technology","description":"CONCLUSIONS: Participants with higher levels of implicit bias spent less visual attention on anomalous facial anatomy, whereas participants with higher levels of empathic concern and perspective taking spent more visual attention on normal facial anatomy. Levels of bias and social dispositions such as empathy may predict layperson gaze patterns toward those with facial anomalies and provide insights to neural mechanisms underlying the \"anomalous is bad\" paradigm.","author":{"name":"Dillan F Villavisanis et al."},"pmid":"37146314","url":"https://pubmed.ncbi.nlm.nih.gov/37146314","doi":"10.1097/SAP.0000000000003435","sortKey":"10.1097/SAP.0000000000003435"},{"title":"Factors Affecting Postoperative Complications of Suction-Curettage by Arthroscopic Shaver for Bromhidrosis","description":"CONCLUSION: Older age was a risk factor for complications. Use of tumescent infiltration resulted in good postoperative pain control and less hematoma. Patients with complications presented with more severe skin scarring, but none experienced limited range of motion after massage.","author":{"name":"Kun-Han Chen et al."},"pmid":"37146312","url":"https://pubmed.ncbi.nlm.nih.gov/37146312","doi":"10.1097/SAP.0000000000003541","sortKey":"10.1097/SAP.0000000000003541"},{"title":"Microvascular Free Flap Reconstruction of Thigh Defects After Tumor Resection in the Setting of Radiation","description":"CONCLUSIONS: Based on the data, microvascular reconstruction of irradiated post-oncological resection defects shows high flap survival rate and success. Given the large size of flap required, the complex nature and size of these wounds, and history of radiation, wound healing complications are common. Despite this, free flap reconstruction should be considered in irradiated thighs with large defects. Studies with larger cohort and longer follow-up are still required.","author":{"name":"Doga Kuruoglu et al."},"pmid":"37146310","url":"https://pubmed.ncbi.nlm.nih.gov/37146310","doi":"10.1097/SAP.0000000000003542","sortKey":"10.1097/SAP.0000000000003542"},{"title":"Longitudinal prospective comparison of pancreatic iron by magnetic resonance in thalassemia patients transfusion-dependent since early childhood treated with combination deferiprone-desferrioxamine vs deferiprone or deferasirox monotherapy","description":"BACKGROUND: In transfusion-dependent thalassemia patients who started regular transfusions in early childhood, we prospectively and longitudinally evaluated the efficacy on pancreatic iron of a combined deferiprone (DFP) + desferrioxamine (DFO) regimen versus either oral iron chelator as monotherapy over a follow-up of 18 months.","author":{"name":"Paolo Ricchi et al."},"pmid":"37146300","url":"https://pubmed.ncbi.nlm.nih.gov/37146300","doi":"10.2450/BloodTransfus.485","sortKey":"10.2450/BloodTransfus.485"},{"title":"Next generation sequencing to identify iron status and individualise blood donors' experience","description":"BACKGROUND: Young adults form the majority of first-time blood donors to Australian Red Cross Lifeblood. However, these donors pose unique challenges for donor safety. Young blood donors, who are still undergoing neurological and physical development, have been found to have lower iron stores, and have higher risks of iron deficiency anaemia when compared to older adults and non-donors. Identifying young donors with higher iron stores may improve donor health and experience, increase donor...","author":{"name":"Georgina Jacko et al."},"pmid":"37146293","url":"https://pubmed.ncbi.nlm.nih.gov/37146293","doi":"10.2450/BloodTransfus.499","sortKey":"10.2450/BloodTransfus.499"},{"title":"Dicationic Diimine Pt(II) Bis(<em>N</em>-heterocyclic allenylidene) Complexes: Extended Pt···Pt Chains, NIR Phosphorescence, and Chromonics","description":"Although square-planar Pt(II) complexes are well-known to self-assemble into supramolecules via noncovalent intermolecular Pt···Pt and/or π-π interactions, the self-assembly of dicationic Pt(II) complexes was scarce due to the electrostatic repulsive force. Herein, a series of dicationic diimine bis(N-heterocyclic allenylidene) Pt(II) complexes were synthesized and characterized. Close Pt···Pt and/or π-π contacts are observed in the crystals of these complexes. In particular, complexes 1·2PF(6)...","author":{"name":"Jinqiang Lin et al."},"pmid":"37146284","url":"https://pubmed.ncbi.nlm.nih.gov/37146284","doi":"10.1021/acs.inorgchem.2c04159","sortKey":"10.1021/acs.inorgchem.2c04159"},{"title":"Carbon Condensation <em>via</em> [4 + 2] Cycloaddition of Highly Unsaturated Carbon Chains","description":"We present computational studies of reaction pathways for alkyne/polyyne dimerization that represent plausible early steps in mechanisms for carbon condensation. A previous computational study of the ring coalescence and annealing model of C(60) formation revealed that a 1,4-didehydrobenzocyclobutadiene intermediate (p-benzyne derivative) has little to no barrier to undergoing an unproductive retro-Bergman cyclization, which brings into question the relevance of that reaction pathway. The...","author":{"name":"Andrew N Owen et al."},"pmid":"37146283","url":"https://pubmed.ncbi.nlm.nih.gov/37146283","doi":"10.1021/acs.jpca.3c00617","sortKey":"10.1021/acs.jpca.3c00617"},{"title":"Application of Microscopic Highly Hydrophilic Silica-Based Nanocomposites with High Surface Exposure in the Efficient Identification of Intact N-Glycopeptides","description":"Glycosylation of proteins regulates the life activities of organisms, while abnormalities of glycosylation sites and glycan structures occur in various serious diseases such as cancer. A separation and enrichment procedure is necessary to realize the analysis of the glycoproteins/peptides by mass spectrometry, for which the surface hydrophilicity of the material is an important factor for the separation and enrichment performance. In the present work, under the premise of an obvious increase of...","author":{"name":"Guoying Weng et al."},"pmid":"37146275","url":"https://pubmed.ncbi.nlm.nih.gov/37146275","doi":"10.1021/acs.analchem.3c00927","sortKey":"10.1021/acs.analchem.3c00927"},{"title":"Genetic and clinical features of patients with intrahepatic cholestasis caused by citrin deficiency","description":"CONCLUSIONS: Three novel variants of the SLC25A13 gene were identified for the first time, providing a reliable molecular reference and expanding the SLC25A13 gene spectrum in patients with CD. Plasma bile acid profiles could be a potential biomarker for non-invasive early diagnosis of patients with intrahepatic cholestasis caused by CD.","author":{"name":"Wenjun Sun et al."},"pmid":"37146272","url":"https://pubmed.ncbi.nlm.nih.gov/37146272","doi":"10.1515/jpem-2022-0616","sortKey":"10.1515/jpem-2022-0616"},{"title":"Relationship of Obesity and Severe Penetrating Thoracic and Abdominal Injuries in Adolescent Patients","description":"BACKGROUND: Over 20% of United States adolescents are obese. A thicker layer of subcutaneous adiposity might provide a protective \"armor\" layer against penetrating wounds. We hypothesized that adolescents with obesity presenting after isolated thoracic and abdominal penetrating trauma have lower rates of severe injury and mortality than adolescents without obesity.","author":{"name":"Claudia A Alvarez et al."},"pmid":"37146266","url":"https://pubmed.ncbi.nlm.nih.gov/37146266","doi":"10.1177/00031348231174003","sortKey":"10.1177/00031348231174003"},{"title":"Health-Related Quality of Life and Vulnerability among People with Myelodysplastic Syndromes: A US National Study","description":"Health-related quality of life (HRQoL) and vulnerability are variably affected in patients with myelodysplastic syndromes (MDS) and other cytopenic states; however, the heterogeneous composition of these diseases has limited our understanding of these domains. The NHLBI-sponsored MDS Natural History Study (NCT02775383) is a prospective cohort enrolling patients undergoing diagnostic work up for suspected MDS or MDS/myeloproliferative neoplasms (MPNs) in the setting of cytopenias. Untreated...","author":{"name":"Gregory A Abel et al."},"pmid":"37146263","url":"https://pubmed.ncbi.nlm.nih.gov/37146263","doi":"10.1182/bloodadvances.2022009000","sortKey":"10.1182/bloodadvances.2022009000"}]